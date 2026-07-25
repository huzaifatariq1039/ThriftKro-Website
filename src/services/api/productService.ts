import { request, ApiResponse } from "./apiClient";
import { Product } from "@/types/types";
import { mockProducts } from "../mockData";

export const productService = {
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return request<Product[]>("/products", {}, mockProducts);
  },

  async getProductById(id: number): Promise<ApiResponse<Product | undefined>> {
    const item = mockProducts.find(p => p.id === id);
    return request<Product | undefined>(`/products/${id}`, {}, item);
  },

  async getProductsByCategory(category: string): Promise<ApiResponse<Product[]>> {
    const items = category === "All" ? mockProducts : mockProducts.filter(p => p.category === category);
    return request<Product[]>(`/products?category=${category}`, {}, items);
  },

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    const q = query.toLowerCase().trim();
    const items = q ? mockProducts.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) : [];
    return request<Product[]>(`/products/search?q=${query}`, {}, items);
  },
};
