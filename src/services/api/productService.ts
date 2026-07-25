import { request, ApiResponse } from "./apiClient";
import { Product } from "@/types/types";
import { mockProducts } from "../mockData";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function mapBackendProduct(bp: any): Product {
  if (!bp) return mockProducts[0];
  if (typeof bp.originalPrice === "number" && bp.img) {
    return bp as Product;
  }
  return {
    id: typeof bp.id === "number" ? bp.id : hashCode(String(bp.id)),
    name: bp.name || "Vintage Apparel",
    brand: bp.brand || "Thrifted",
    price: typeof bp.price === "number" ? bp.price : parseFloat(bp.price) || 0,
    originalPrice: typeof bp.original_price === "number" ? bp.original_price : (parseFloat(bp.original_price) || ((bp.price || 1000) * 1.4)),
    condition: bp.condition || "Good",
    size: bp.size || "M",
    seller: bp.seller || bp.seller_name || "Thrift Store",
    sellerRating: bp.sellerRating || 4.8,
    img: bp.image_url || bp.img || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
    category: bp.category || "Men",
  };
}

export const productService = {
  async getProducts(params: { category?: string; q?: string; sort_by?: string } = {}): Promise<ApiResponse<Product[]>> {
    try {
      const queryParams = new URLSearchParams();
      if (params.category && params.category !== "All") queryParams.append("category", params.category);
      if (params.q) queryParams.append("q", params.q);
      if (params.sort_by) queryParams.append("sort_by", params.sort_by);

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
      const res = await request<any[]>(`/products${queryString}`, {}, mockProducts);

      const products = Array.isArray(res.data) ? res.data.map(mapBackendProduct) : mockProducts;
      return { data: products, status: res.status };
    } catch (err) {
      console.warn("Error in getProducts API, returning fallback:", err);
      return { data: mockProducts, status: 200 };
    }
  },

  async getProductById(id: number | string): Promise<ApiResponse<Product | undefined>> {
    try {
      const item = mockProducts.find(p => p.id === Number(id));
      const res = await request<any>(`/products/${id}`, {}, item);
      return { data: res.data ? mapBackendProduct(res.data) : item, status: res.status };
    } catch {
      const item = mockProducts.find(p => p.id === Number(id));
      return { data: item, status: 200 };
    }
  },

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ category });
  },

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ q: query });
  },

  async createProduct(productData: Partial<Product> & { image_url?: string }): Promise<ApiResponse<Product>> {
    const fallbackNewProduct: Product = {
      id: Date.now(),
      name: productData.name || "New Listing",
      brand: productData.brand || "Vintage",
      price: productData.price || 2500,
      originalPrice: productData.originalPrice || 4000,
      condition: productData.condition || "Good",
      size: productData.size || "L",
      seller: productData.seller || "My Thrift Shop",
      sellerRating: 5.0,
      img: productData.img || productData.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
      category: productData.category || "Men",
    };

    try {
      const res = await request<any>(
        "/products/",
        {
          method: "POST",
          body: JSON.stringify({
            name: productData.name,
            description: "Uploaded from Website Seller Dashboard",
            price: productData.price,
            original_price: productData.originalPrice,
            category: productData.category || "Jackets",
            department: "Men",
            size: productData.size || "M",
            brand: productData.brand || "Generic",
            condition: productData.condition || "Good",
            image_url: productData.img || productData.image_url || "https://example.com/img.jpg",
            images: [],
            tags: [],
          }),
        },
        fallbackNewProduct
      );
      return { data: mapBackendProduct(res.data), status: res.status };
    } catch {
      return { data: fallbackNewProduct, status: 200 };
    }
  },

  async importProductsCsv(file: File): Promise<ApiResponse<{ success: boolean; message: string }>> {
    const formData = new FormData();
    formData.append("file", file);

    return request<{ success: boolean; message: string }>(
      "/products/import-csv",
      {
        method: "POST",
        body: formData,
      },
      { success: true, message: "CSV imported successfully (Mock)" }
    );
  },
};
