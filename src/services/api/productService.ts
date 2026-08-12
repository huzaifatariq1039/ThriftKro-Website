import { request, ApiResponse } from "./apiClient";
import { Product } from "@/types/types";

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
  if (!bp) throw new Error("Product data is missing");
  if (typeof bp.originalPrice === "number" && bp.img) {
    return bp as Product;
  }
  return {
    id: typeof bp.id === "string" ? bp.id : String(bp.id || hashCode(String(bp.name))),
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
  async getProducts(params: { category?: string; q?: string; sort_by?: string; min_price?: number; max_price?: number } = {}): Promise<ApiResponse<Product[]>> {
    try {
      const query = new URLSearchParams();
      if (params.category && params.category !== "All") query.set("category", params.category);
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
    } catch (err) {
      console.warn("Error in getProducts API, using mock fallback:", err);
      try {
        const mockProducts = JSON.parse(localStorage.getItem("mock_products") || "[]");
        if (Array.isArray(mockProducts) && mockProducts.length > 0) {
          let filtered = mockProducts.map(mapBackendProduct);
          if (params.category && params.category !== "All") {
            filtered = filtered.filter(p => p.category === params.category);
          }
          if (params.q) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(params.q!.toLowerCase()));
          }
          return { data: filtered, status: 200 };
        }
      } catch (e) {
        // ignore
      }
      return { data: [], status: 500 };
    }
  },

  async getProductById(id: string): Promise<ApiResponse<Product | undefined>> {
    try {
      const res = await request<any>(`/products/${id}`);
      return { data: res.data ? mapBackendProduct(res.data) : undefined, status: res.status };
    } catch {
      return { data: undefined, status: 500 };
    }
  },

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ category });
  },

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ q: query });
  },

  async createProduct(productData: Partial<Product> & { image_url?: string; images?: string[]; description?: string }): Promise<ApiResponse<Product>> {
    try {
      const res = await request<any>(
        "/products/",
        {
          method: "POST",
          body: JSON.stringify({
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
          })
        }
      );
      return { data: mapBackendProduct(res.data), status: res.status };
    } catch (err) {
      throw err;
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
