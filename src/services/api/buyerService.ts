import { request, ApiResponse } from "./apiClient";
import { BuyerOrder, Address, Card } from "@/types/types";

export interface CheckoutResponse {
  detail: string;
  order_id: string;
  total_amount: number;
  seller_orders_count: number;
}

const CHECKOUT_IDEMPOTENCY_KEY = "thrift_kro_checkout_idempotency_key";

function getOrCreateCheckoutKey(): string {
  const existing = sessionStorage.getItem(CHECKOUT_IDEMPOTENCY_KEY);
  if (existing) return existing;

  const randomPart = typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const key = `checkout-${randomPart}`;
  sessionStorage.setItem(CHECKOUT_IDEMPOTENCY_KEY, key);
  return key;
}

function clearCheckoutKey(key: string): void {
  if (sessionStorage.getItem(CHECKOUT_IDEMPOTENCY_KEY) === key) {
    sessionStorage.removeItem(CHECKOUT_IDEMPOTENCY_KEY);
  }
}

export const buyerService = {
  async getOrders(): Promise<ApiResponse<BuyerOrder[]>> {
    try {
      const res = await request<any[]>("/orders/");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const orders: BuyerOrder[] = res.data.map((o, idx) => ({
          id: String(o.id ?? idx + 1),
          orderNo: o.order_number || `TK-${10300 + idx}`,
          date: o.created_at ? new Date(o.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Today",
          total: o.total_amount ? `PKR ${o.total_amount.toLocaleString()}` : "PKR 0",
          itemsCount: o.items_count || 1,
          status: o.status === "DELIVERED" ? "Delivered" : o.status === "SHIPPED" ? "In Transit" : "Processing",
          items: (o.items || []).map((item: any) => ({
            name: item.name || "Thrifted Item",
            price: item.price ? `PKR ${item.price}` : "PKR 0",
            size: item.size || "M",
            condition: item.condition || "Good",
            seller: item.seller || "Thrift Shop",
            img: item.img || item.image_url || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
          })),
        }));
        return { data: orders, status: 200 };
      }
      return { data: [], status: 200 };
    } catch (err) {
      console.warn("Could not fetch orders from API:", err);
      return { data: [], status: 500 };
    }
  },

  // ── Cart ──

  async getCart(): Promise<ApiResponse<{ items: any[]; total_price: number; total_items: number }>> {
    try {
      const res = await request<any>("/shopping/cart");
      return { data: res.data, status: res.status };
    } catch {
      return { data: { items: [], total_price: 0, total_items: 0 }, status: 200 };
    }
  },

  async addToCart(productId: string): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>(`/shopping/cart/add/${productId}`, { method: "POST" });
  },

  async removeFromCart(productId: string): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>(`/shopping/cart/remove/${productId}`, { method: "DELETE" });
  },

  async checkoutCart(shippingAddressId: string | null = null): Promise<ApiResponse<CheckoutResponse>> {
    const idempotencyKey = getOrCreateCheckoutKey();
    const response = await request<CheckoutResponse>(
      "/shopping/cart/checkout",
      {
        method: "POST",
        headers: { "Idempotency-Key": idempotencyKey },
        body: JSON.stringify({
          shipping_address_id: shippingAddressId,
          payment_method: "CASH_ON_DELIVERY",
        }),
      }
    );

    if (!response.data?.order_id) {
      throw new Error("Checkout response did not include an order ID");
    }

    clearCheckoutKey(idempotencyKey);
    return response;
  },

  // ── Wishlist ──

  async getWishlist(): Promise<ApiResponse<{ items: any[]; total_items: number }>> {
    try {
      const res = await request<any>("/shopping/wishlist");
      return { data: res.data, status: res.status };
    } catch {
      return { data: { items: [], total_items: 0 }, status: 200 };
    }
  },

  async toggleWishlist(productId: string): Promise<ApiResponse<{ detail: string; is_in_wishlist: boolean }>> {
    return request<{ detail: string; is_in_wishlist: boolean }>(`/shopping/wishlist/toggle/${productId}`, { method: "POST" });
  },

  // ── Reviews ──

  async getProductReviews(productId: string): Promise<ApiResponse<any[]>> {
    try {
      const res = await request<any[]>(`/reviews/product/${productId}`);
      return { data: Array.isArray(res.data) ? res.data : [], status: res.status };
    } catch {
      return { data: [], status: 200 };
    }
  },

  async submitReview(productId: string, rating: number, comment: string): Promise<ApiResponse<any>> {
    return request<any>(
      "/reviews/",
      {
        method: "POST",
        body: JSON.stringify({ product_id: productId, rating, comment }),
      }
    );
  },

  // ── Addresses & Cards (backend endpoints may not exist yet) ──

  async getAddresses(): Promise<ApiResponse<Address[]>> {
    try {
      return await request<Address[]>("/users/me/addresses");
    } catch {
      return { data: [], status: 500 };
    }
  },

  async getPaymentCards(): Promise<ApiResponse<Card[]>> {
    try {
      return await request<Card[]>("/users/me/cards");
    } catch {
      return { data: [], status: 500 };
    }
  },

  // ── Wallet ──

  async getWalletBalance(): Promise<ApiResponse<{ balance: number }>> {
    const res = await request<any>("/wallet/balance");
    return { data: { balance: res.data?.balance || 0 }, status: res.status };
  },

  async depositWallet(amount: number): Promise<ApiResponse<{ balance: number }>> {
    const res = await request<any>(
      "/wallet/deposit",
      {
        method: "POST",
        body: JSON.stringify({ amount }),
      }
    );
    return { data: { balance: res.data?.balance || 0 }, status: res.status };
  },
};
