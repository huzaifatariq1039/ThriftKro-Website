import { request, ApiResponse } from "./apiClient";

export const adminService = {
  async getOverviewMetrics() {
    const res = await request<any>("/admin/stats");
    return {
      data: {
        gmv: res.data?.revenue?.gross_merchandise_value_pkr || 0,
        revenue: res.data?.revenue?.total_platform_revenue_pkr || 0,
        activeListings: res.data?.products?.live_available || 0,
        kycPending: 0, 
        escrowHold: (res.data?.revenue?.total_platform_revenue_pkr || 0) * (1 / 0.02),
        usersTotal: res.data?.users?.total_users || 0,
        ordersTotal: res.data?.orders?.total_orders || 0,
        ordersInProgress: res.data?.orders?.in_progress || 0,
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
