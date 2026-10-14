import { request, ApiResponse } from "./apiClient";
import { Product, ProductVariant } from "@/types/types";

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

  async createProduct(productData: Partial<Product> & { image_url?: string; images?: string[]; description?: string }): Promise<ApiResponse<Product>> {
    const payload = {
      name: productData.name,
      description: productData.description || "Uploaded from Website Seller Dashboard",
      price: productData.price,
      original_price: productData.originalPrice,
      category: productData.category || "Jackets",
      department: "Men",
      size: productData.size || "M",
      brand: productData.brand || "Generic",
      condition: productData.condition || "Good",
      image_url: productData.img || productData.image_url || (productData.images && productData.images.length > 0 ? productData.images[0] : "https://example.com/img.jpg"),
      images: productData.images || [],
      tags: [],
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
