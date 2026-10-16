import { request } from "./apiClient";

type MoneyValue = number | string;

interface AdminStatsResponse {
  users: {
    total_users: number;
    buyers: number;
    sellers: number;
    admins: number;
    verified_sellers: number;
    pending_verifications: number;
  };
  products: {
    total_products: number;
    live_available: number;
    out_of_stock: number;
    draft: number;
    archived: number;
  };
  orders: {
    total_checkout_orders: number;
    open_checkout_orders: number;
    completed_checkout_orders: number;
    closed_checkout_orders: number;
    total_seller_orders: number;
  };
  revenue: {
    settled_gmv_pkr: MoneyValue;
    settled_payment_volume_pkr: MoneyValue;
    recognized_platform_revenue_pkr: MoneyValue;
    escrow_held_pkr: MoneyValue;
    pending_payment_value_pkr: MoneyValue;
  };
}

function asAmount(value: MoneyValue | null | undefined): number {
  const amount = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(amount) ? amount : 0;
}

export const adminService = {
  async getOverviewMetrics() {
    const res = await request<AdminStatsResponse>("/admin/stats");
    return {
      data: {
        gmv: asAmount(res.data?.revenue.settled_gmv_pkr),
        settledPaymentVolume: asAmount(
          res.data?.revenue.settled_payment_volume_pkr,
        ),
        revenue: asAmount(
          res.data?.revenue.recognized_platform_revenue_pkr,
        ),
        escrowHold: asAmount(res.data?.revenue.escrow_held_pkr),
        pendingPaymentValue: asAmount(
          res.data?.revenue.pending_payment_value_pkr,
        ),
        activeListings: res.data?.products.live_available ?? 0,
        kycPending: res.data?.users.pending_verifications ?? 0,
        usersTotal: res.data?.users.total_users ?? 0,
        ordersTotal: res.data?.orders.total_checkout_orders ?? 0,
        ordersInProgress: res.data?.orders.open_checkout_orders ?? 0,
        ordersCompleted: res.data?.orders.completed_checkout_orders ?? 0,
        ordersClosed: res.data?.orders.closed_checkout_orders ?? 0,
        sellerOrdersTotal: res.data?.orders.total_seller_orders ?? 0,
      },
      status: res.status,
    };
  },

  async getKycQueue() {
    const res = await request<any[]>("/sellers/verification/pending");
    let backendQueue: any[] = [];
    if (Array.isArray(res.data) && res.data.length > 0) {
      backendQueue = res.data.map((item, idx) => ({
        id: item.id || idx + 1,
        shop: item.business_name || "Thrift Shop",
        type: item.business_type || "Shop",
        name: item.seller_name || "Seller",
        cnic: item.cnic_number || "35202-0000000-1",
        phone: item.phone_number || "+92 000 0000000",
        city: item.city || "Unknown",
        address: item.address || "",
        revenue: "PKR 0",
        submitted: item.created_at ? new Date(item.created_at).toLocaleTimeString() : "Recently",
        status: (item.status || "PENDING").toUpperCase(),
        cnicFront: item.cnic_front_url || "",
        cnicBack: item.cnic_back_url || "",
        aiVerified: item.ai_verified ?? false,
        productsProof: item.products_proof || [],
      }));
    }
    return { data: backendQueue, status: res.status };
  },

  async approveKyc(id: number | string, notes: string = "Approved by admin") {
    return await request(
      `/sellers/verification/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "APPROVED", admin_notes: notes }),
      },
      { success: true }
    );
  },

  async rejectKyc(id: number | string, notes: string = "Rejected by admin") {
    return await request(
      `/sellers/verification/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "REJECTED", admin_notes: notes }),
      },
      { success: true }
    );
  },

  async getCatalog() {
    const res = await request<any[]>("/products/");
    let catalog: any[] = [];
    if (Array.isArray(res.data) && res.data.length > 0) {
      catalog = res.data.map((p, i) => ({
        id: typeof p.id === "number" ? p.id : i + 101,
        title: p.name || "Apparel Item",
        seller: p.seller || "Thrift Seller",
        price: `PKR ${p.price || 5000}`,
        status: p.status === "ACTIVE" || p.status === "Active" ? "Active" : "Flagged",
        flagged: p.status === "FLAGGED",
      }));
    }
    return { data: catalog, status: res.status };
  },

  async getTickets() {
    const res = await request<any[]>("/admin/tickets");
    let tickets: any[] = [];
    if (Array.isArray(res.data) && res.data.length > 0) {
      tickets = res.data.map(t => ({
        id: `DIS-${t.id.substring(0, 4)}`,
        realId: t.id,
        order: `ORD-${t.order_id ? t.order_id.substring(0, 4) : "0000"}`,
        buyer: "Buyer",
        seller: "Seller",
        item: t.subject || "Support Ticket",
        amount: 0,
        reason: t.description || "No description provided",
        status: (t.status || "OPEN").toUpperCase(),
        opened: new Date(t.created_at).toLocaleDateString(),
      }));
    }
    return { data: tickets, status: res.status };
  },

  async updateTicketStatus(ticketId: string, status: string, notes: string = "") {
    return await request(
      `/admin/tickets/${ticketId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status, resolution_notes: notes }),
      },
      { success: true }
    );
  },

  async getOrders() {
    const res = await request<any[]>("/admin/orders");
    let orders: any[] = [];
    if (Array.isArray(res.data) && res.data.length > 0) {
      orders = res.data.map(o => ({
        id: `ORD-${String(o.id).substring(0, 4).toUpperCase()}`,
        realId: o.id,
        buyer: o.buyer_id || "Buyer",
        seller: o.seller_id || "Seller",
        item: o.product_id || "Item",
        amount: o.total_amount || 0,
        escrow: o.status === "FUNDS_IN_ESCROW" || o.status === "SHIPPED" || o.status === "DELIVERED" ? "LOCKED" : o.status === "COMPLETED_PAYOUT" ? "RELEASED" : "PENDING",
        status: o.status || "PROCESSING",
        date: new Date(o.created_at).toLocaleDateString(),
      }));
    }
    return { data: orders, status: res.status };
  }
};
