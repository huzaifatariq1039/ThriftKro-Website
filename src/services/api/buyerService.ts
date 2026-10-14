import { request, ApiResponse } from "./apiClient";
import { BuyerOrder, Address, Card } from "@/types/types";

export interface CheckoutResponse {
  detail: string;
  order_id: string;
  total_amount: number;
  seller_orders_count: number;
}

export interface CartItemDto {
  id: string;
  product_variant_id: string;
  quantity: number;
  line_total: number;
  variant: {
    id: string;
    sku: string | null;
    attributes: Record<string, unknown>;
    price_adjustment: number;
    quantity_in_stock: number;
  } | null;
  product: {
    id: string;
    name: string;
    price: number;
    brand: string | null;
    primary_image_url: string | null;
    seller_name: string | null;
  } | null;
}

export interface CartSummaryDto {
  items: CartItemDto[];
  total_price: number;
  total_items: number;
}

type SellerOrderDto = {
  id: string;
  seller_name?: string | null;
  status: string;
  items?: Array<{
    id: string;
    product_variant_id: string;
    quantity: number;
    price_at_purchase: number;
    product_name?: string | null;
    product_image?: string | null;
    variant_attributes?: Record<string, unknown> | null;
  }>;
};

type OrderDto = {
  id: string;
  total_amount: number;
  created_at?: string | null;
  overall_status?: string | null;
  seller_orders?: SellerOrderDto[];
};

function toDisplayStatus(order: OrderDto): BuyerOrder["status"] {
  const statuses = order.seller_orders?.map(sellerOrder => sellerOrder.status) || [];
  const aggregate = order.overall_status;

  if (aggregate === "DISPUTED" || statuses.includes("DISPUTED")) return "Disputed";
  if (aggregate === "REFUNDED" || (statuses.length > 0 && statuses.every(status => status === "REFUNDED"))) return "Refunded";
  if (aggregate === "CANCELLED" || (statuses.length > 0 && statuses.every(status => status === "CANCELLED"))) return "Cancelled";
  if (["COMPLETED", "COMPLETED_PAYOUT", "DELIVERED"].includes(aggregate || "") ||
      (statuses.length > 0 && statuses.every(status => ["COMPLETED", "COMPLETED_PAYOUT", "DELIVERED"].includes(status)))) {
    return "Delivered";
  }
  if (aggregate === "SHIPPED" || statuses.includes("SHIPPED")) return "In Transit";
  if (aggregate === "PENDING_PAYMENT" || (statuses.length > 0 && statuses.every(status => status === "PENDING_PAYMENT"))) return "Pending Payment";
  return "Processing";
}

function mapOrder(order: OrderDto): BuyerOrder {
  const items = (order.seller_orders || []).flatMap(sellerOrder =>
    (sellerOrder.items || []).map(item => ({
      id: item.id,
      name: item.product_name || "Order item",
      price: `PKR ${Number(item.price_at_purchase || 0).toLocaleString()}`,
      quantity: item.quantity,
      size: String(item.variant_attributes?.size || item.variant_attributes?.Size || "One Size"),
      seller: sellerOrder.seller_name || "Seller",
      img: item.product_image || "",
    })),
  );
  const firstItem = items[0];

  return {
    id: order.id,
    orderNo: `TK-${order.id.slice(0, 8).toUpperCase()}`,
    date: order.created_at
      ? new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : "Date unavailable",
    total: `PKR ${Number(order.total_amount || 0).toLocaleString()}`,
    itemsCount: items.reduce((total, item) => total + item.quantity, 0),
    status: toDisplayStatus(order),
    items,
    name: firstItem ? (items.length > 1 ? `${firstItem.name} + ${items.length - 1} more` : firstItem.name) : "Order",
    img: firstItem?.img || "",
  };
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
    const response = await request<OrderDto[]>("/orders/");
    return {
      data: Array.isArray(response.data) ? response.data.map(mapOrder) : [],
      status: response.status,
    };
  },

  // ── Cart ──

  async getCart(): Promise<ApiResponse<CartSummaryDto>> {
    return request<CartSummaryDto>("/shopping/cart");
  },

  async addToCart(productVariantId: string, quantity = 1): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>("/shopping/cart/add", {
      method: "POST",
      body: JSON.stringify({ product_variant_id: productVariantId, quantity }),
    });
  },

  async removeFromCart(cartItemId: string): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>(`/shopping/cart/remove/${cartItemId}`, { method: "DELETE" });
  },

  async updateCartItem(cartItemId: string, quantity: number): Promise<ApiResponse<{ detail: string }>> {
    return request<{ detail: string }>(`/shopping/cart/item/${cartItemId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    });
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

};
