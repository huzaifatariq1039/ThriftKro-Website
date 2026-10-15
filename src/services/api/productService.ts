import { request, ApiResponse } from "./apiClient";
import { Product, ProductVariant, SellerListing } from "@/types/types";

export interface CategoryDto {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  is_active: boolean;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  brand?: string;
  condition: string;
  imageFiles: File[];
  variants: Array<{
    sku?: string;
    attributes: Record<string, string>;
    priceAdjustment?: number;
    quantityInStock: number;
  }>;
  tags?: string[];
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function mapAttributes(attributes: unknown): Record<string, string> {
  if (!attributes || typeof attributes !== "object" || Array.isArray(attributes)) return {};
  return Object.fromEntries(
    Object.entries(attributes).map(([key, value]) => [key, String(value)]),
  );
}

export function mapBackendProduct(bp: any): Product {
  if (!bp) throw new Error("Product data is missing");
  if (typeof bp.originalPrice === "number" && bp.img) {
    return bp as Product;
  }

  const variants: ProductVariant[] = Array.isArray(bp.variants)
    ? bp.variants.map((variant: any) => ({
        id: String(variant.id),
        sku: variant.sku ?? null,
        attributes: mapAttributes(variant.attributes),
        priceAdjustment: Number(variant.price_adjustment) || 0,
        quantityInStock: Number(variant.quantity_in_stock) || 0,
      }))
    : [];
  const defaultVariant = variants.find(variant => variant.quantityInStock > 0) || variants[0];
  const images = Array.isArray(bp.images) ? bp.images : [];
  const primaryImage = images.find((image: any) => image.is_primary) || images[0];
  const categoryName = typeof bp.category === "object" && bp.category
    ? bp.category.name
    : bp.category;
  const variantSize = defaultVariant?.attributes.size || defaultVariant?.attributes.Size;
  const availableSizes = [...new Set(
    variants
      .map(variant => variant.attributes.size || variant.attributes.Size)
      .filter((size): size is string => Boolean(size)),
  )];

  return {
    id: typeof bp.id === "string" ? bp.id : String(bp.id || hashCode(String(bp.name))),
    variantId: defaultVariant?.id,
    name: bp.name || "Vintage Apparel",
    brand: bp.brand || "Thrifted",
    price: (typeof bp.price === "number" ? bp.price : parseFloat(bp.price) || 0) + (defaultVariant?.priceAdjustment || 0),
    originalPrice: typeof bp.original_price === "number" ? bp.original_price : (parseFloat(bp.original_price) || ((bp.price || 1000) * 1.4)),
    condition: bp.condition || "Good",
    size: availableSizes.join(", ") || variantSize || "One Size",
    seller: bp.seller_name || "Thrift Store",
    sellerRating: Number(bp.seller_rating) || 0,
    img: primaryImage?.image_url || "",
    category: categoryName || "Uncategorized",
    variants,
  };
}

function mapSellerListing(product: any): SellerListing {
  const images = Array.isArray(product.images) ? product.images : [];
  const primaryImage = images.find((image: any) => image.is_primary) || images[0];
  const categoryName = typeof product.category === "object" && product.category
    ? product.category.name
    : product.category;
  let status: SellerListing["status"] = "Pending";
  if (product.deleted_at) status = "Trashed";
  else if (product.status === "AVAILABLE") status = "Active";
  else if (product.status === "OUT_OF_STOCK") status = "Out of Stock";
  else if (product.status === "ARCHIVED") status = "Archived";

  return {
    id: String(product.id),
    name: product.name || "Untitled listing",
    price: Number(product.price) || 0,
    views: 0,
    likes: 0,
    category: categoryName || "Uncategorized",
    status,
    img: primaryImage?.image_url || "",
  };
}

async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await request<{ url: string }>("/upload/image", {
    method: "POST",
    body: formData,
  });
  if (!response.data?.url) throw new Error("Image upload did not return a URL");
  return response.data.url;
}

export const productService = {
  async getProducts(params: { category?: string; q?: string; sort_by?: string; min_price?: number; max_price?: number } = {}): Promise<ApiResponse<Product[]>> {
    const query = new URLSearchParams();
    if (params.category && params.category !== "All") {
      query.set("category", params.category.trim().toLowerCase().replace(/\s+/g, "-"));
    }
    if (params.q) query.set("q", params.q);
    if (params.sort_by) query.set("sort_by", params.sort_by);
    if (params.min_price !== undefined) query.set("min_price", String(params.min_price));
    if (params.max_price !== undefined) query.set("max_price", String(params.max_price));

    const qs = query.toString();
    const res = await request<any[]>(`/products/${qs ? `?${qs}` : ""}`);
    if (Array.isArray(res.data)) {
      return { data: res.data.map(mapBackendProduct), status: res.status };
    }
    return { data: [], status: 200 };
  },

  async getProductById(id: string): Promise<ApiResponse<Product | undefined>> {
    const res = await request<any>(`/products/${id}`);
    return { data: res.data ? mapBackendProduct(res.data) : undefined, status: res.status };
  },

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ category });
  },

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ q: query });
  },

  async getCategories(): Promise<ApiResponse<CategoryDto[]>> {
    const response = await request<CategoryDto[]>("/categories/?flat=true");
    return {
      data: Array.isArray(response.data)
        ? response.data.filter(category => category.is_active)
        : [],
      status: response.status,
    };
  },

  async getSellerListings(): Promise<ApiResponse<SellerListing[]>> {
    const response = await request<any[]>("/products/seller/me");
    return {
      data: Array.isArray(response.data) ? response.data.map(mapSellerListing) : [],
      status: response.status,
    };
  },

  async createProduct(productData: CreateProductInput): Promise<ApiResponse<Product>> {
    if (productData.imageFiles.length === 0) {
      throw new Error("At least one product image is required");
    }
    if (productData.variants.length === 0) {
      throw new Error("At least one product variant is required");
    }

    const imageUrls = await Promise.all(productData.imageFiles.map(uploadProductImage));
    const payload = {
      name: productData.name,
      description: productData.description || null,
      price: productData.price,
      original_price: productData.originalPrice,
      category_id: productData.categoryId,
      brand: productData.brand || null,
      condition: productData.condition,
      images: imageUrls.map((imageUrl, index) => ({
        image_url: imageUrl,
        is_primary: index === 0,
        display_order: index,
      })),
      variants: productData.variants.map(variant => ({
        sku: variant.sku || null,
        attributes: variant.attributes,
        price_adjustment: variant.priceAdjustment || 0,
        quantity_in_stock: variant.quantityInStock,
      })),
      tags: [...new Set((productData.tags || []).map(tag => tag.trim()).filter(Boolean))],
    };

    const res = await request<any>(
      "/products/",
      {
        method: "POST",
        body: JSON.stringify(payload)
      }
    );
    return { data: mapBackendProduct(res.data), status: res.status };
  },

  async deleteListing(id: string | number): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>(`/products/${id}`, { method: "DELETE" });
  },

  async restoreListing(id: string | number): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>(`/products/${id}/restore`, { method: "POST" });
  },

  async importProductsCsv(file: File): Promise<ApiResponse<{ success: boolean; message: string }>> {
    const formData = new FormData();
    formData.append("file", file);

    return request<{ success: boolean; message: string }>(
      "/products/import-csv",
      {
        method: "POST",
        body: formData as any, // Bypass TypeScript strict checking for fetch body
      }
    );
  },
};
