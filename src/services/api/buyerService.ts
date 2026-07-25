import { request, ApiResponse } from "./apiClient";
import { BuyerOrder, Address, Card, Product } from "@/types/types";
import { mockBuyerOrders, mockAddresses, mockCards } from "../mockData";

export const buyerService = {
  async getOrders(): Promise<ApiResponse<BuyerOrder[]>> {
    try {
      const res = await request<any[]>("/orders/", {}, mockBuyerOrders);
      if (Array.isArray(res.data) && res.data.length > 0) {
        const orders: BuyerOrder[] = res.data.map((o, idx) => ({
          id: typeof o.id === "number" ? o.id : idx + 1,
          orderNo: o.order_number || `TK-${10300 + idx}`,
          date: o.created_at ? new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Today",
          total: o.total_amount ? `PKR ${o.total_amount.toLocaleString()}` : "PKR 4,500",
          itemsCount: o.items_count || 1,
          status: o.status === "DELIVERED" ? "Delivered" : o.status === "SHIPPED" ? "In Transit" : "Processing",
          items: (o.items || []).map((item: any) => ({
            name: item.name || "Thrifted Item",
            price: item.price ? `PKR ${item.price}` : "PKR 2,500",
            size: item.size || "M",
            condition: item.condition || "Good",
            seller: item.seller || "Thrift Shop",
            img: item.img || item.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
          })),
        }));
        return { data: orders, status: 200 };
      }
    } catch {
      // Fallback
    }
    return { data: mockBuyerOrders, status: 200 };
  },

  async checkout(items: Product[]): Promise<ApiResponse<{ success: boolean; orderIds: string[] }>> {
    const orderIds = items.map((_, i) => `TK-${10300 + i}`);
    const fallback = { success: true, orderIds };

    try {
      // If items exist, call /orders/checkout
      const firstProduct = items[0];
      const res = await request<any>(
        "/orders/checkout",
        {
          method: "POST",
          body: JSON.stringify({
            product_id: firstProduct?.id ? String(firstProduct.id) : "00000000-0000-0000-0000-000000000000",
            shipping_address: "Default Buyer Address, Lahore",
            payment_method: "WALLET",
          }),
        },
        fallback
      );
      if (res.data) {
        return { data: { success: true, orderIds: [res.data.id ? String(res.data.id) : orderIds[0]] }, status: 200 };
      }
    } catch {
      // Return fallback
    }

    return { data: fallback, status: 200 };
  },

  async getAddresses(): Promise<ApiResponse<Address[]>> {
    return request<Address[]>("/users/me/addresses", {}, mockAddresses);
  },

  async getPaymentCards(): Promise<ApiResponse<Card[]>> {
    return request<Card[]>("/users/me/cards", {}, mockCards);
  },

  async getWalletBalance(): Promise<ApiResponse<{ balance: number }>> {
    return request<{ balance: number }>("/wallet/balance", {}, { balance: 15000 });
  },

  async depositWallet(amount: number): Promise<ApiResponse<{ balance: number }>> {
    return request<{ balance: number }>(
      "/wallet/deposit",
      {
        method: "POST",
        body: JSON.stringify({ amount }),
      },
      { balance: 15000 + amount }
    );
  },
};
