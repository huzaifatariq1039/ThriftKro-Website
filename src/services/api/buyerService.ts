import { request, ApiResponse } from "./apiClient";
import { BuyerOrder, Address, Card, Product } from "@/types/types";
import { mockBuyerOrders, mockAddresses, mockCards } from "../mockData";

export const buyerService = {
  async getOrders(): Promise<ApiResponse<BuyerOrder[]>> {
    return request<BuyerOrder[]>("/buyer/orders", {}, mockBuyerOrders);
  },

  async checkout(items: Product[]): Promise<ApiResponse<{ success: boolean; orderIds: string[] }>> {
    const orderIds = items.map((_, i) => `TK-${10300 + i}`);
    return request<{ success: boolean; orderIds: string[] }>("/buyer/checkout", { method: "POST", body: JSON.stringify({ items }) }, { success: true, orderIds });
  },

  async getAddresses(): Promise<ApiResponse<Address[]>> {
    return request<Address[]>("/buyer/addresses", {}, mockAddresses);
  },

  async getPaymentCards(): Promise<ApiResponse<Card[]>> {
    return request<Card[]>("/buyer/payments", {}, mockCards);
  },
};
