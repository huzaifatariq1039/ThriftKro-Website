import { request, ApiResponse } from "./apiClient";

export const adminService = {
  async getOverviewMetrics() {
    const fallbackMetrics = {
      gmv: "PKR 4,820,000",
      revenue: "PKR 96,400",
      activeListings: 1420,
      kycPending: 12,
      escrowHold: "PKR 380,000",
      usersTotal: 250,
      ordersTotal: 120,
      ordersInProgress: 15,
    };

    try {
      const res = await request<any>("/admin/stats");
      if (res.data && res.data.revenue) {
        return {
          data: {
            gmv: res.data.revenue.gross_merchandise_value_pkr || 0,
            revenue: res.data.revenue.total_platform_revenue_pkr || 0,
            activeListings: res.data.products.live_available || 0,
            kycPending: 0, // Not provided directly in stats, we can fetch via kyc queue length
            escrowHold: res.data.revenue.total_platform_revenue_pkr * (1 / 0.02) || 0, // Roughly inferring total escrow hold
            
            // Additional metrics for pulse
            usersTotal: res.data.users.total_users || 0,
            ordersTotal: res.data.orders.total_orders || 0,
            ordersInProgress: res.data.orders.in_progress || 0,
          },
          status: res.status,
        };
      }
    } catch {
      // Fallback
    }

    return { data: fallbackMetrics, status: 200 };
  },

  async getKycQueue() {
    // ── Read any locally-submitted KYC requests from localStorage ──
    let localQueue: any[] = [];
    try {
      localQueue = JSON.parse(localStorage.getItem("mock_kyc_queue") || "[]");
    } catch {}

    // Map localStorage items into the standard KycReq shape
    const localMapped = localQueue.map((item: any, idx: number) => ({
      id: item.id || `LOCAL-${idx + 1}`,
      shop: item.shop || item.business_name || "Thrift Shop",
      type: item.type || item.business_type || "Shop",
      name: item.name || item.shop || "Seller",
      cnic: item.cnic || item.cnic_number || "35202-0000000-1",
      phone: item.phone || item.phone_number || "+92 000 0000000",
      city: item.city || "Unknown",
      address: item.address || "",
      revenue: item.revenue || "PKR 0",
      submitted: item.submitted || "Recently",
      status: (item.status || "PENDING").toUpperCase(),
      cnicFront: item.cnicFront || item.cnic_front_url || "",
      cnicBack: item.cnicBack || item.cnic_back_url || "",
      aiVerified: item.aiVerified ?? item.ai_verified ?? false,
      productsProof: item.productsProof || item.products_proof || [],
    }));

    // Static fallback entries (demo data)
    const fallbackKyc = [
      { id: 1, shop: "KicksCentral", name: "Hamza Malik", cnic: "35202-1234567-1", submitted: "10 mins ago", status: "PENDING", type: "Shop", phone: "+92 300 1234567", city: "Lahore", address: "", revenue: "PKR 0", cnicFront: "", cnicBack: "", aiVerified: false, productsProof: [] },
      { id: 2, shop: "VintageVault", name: "Ayesha Khan", cnic: "42101-9876543-2", submitted: "45 mins ago", status: "PENDING", type: "Individual", phone: "+92 321 9876543", city: "Karachi", address: "", revenue: "PKR 0", cnicFront: "", cnicBack: "", aiVerified: false, productsProof: [] },
    ];

    // Try the real backend first
    try {
      const res = await request<any[]>("/sellers/verification/pending");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const backendQueue = res.data.map((item, idx) => ({
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
        // Merge: local submissions on top, then backend, then fallback demo
        return { data: [...localMapped, ...backendQueue], status: res.status };
      }
    } catch {
      // Backend offline — fall through to local + fallback
    }

    // Backend offline: show local submissions + static demo data
    return { data: [...localMapped, ...fallbackKyc], status: 200 };
  },

  async approveKyc(id: number | string, notes: string = "Approved by admin") {
    return request(
      `/sellers/verification/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "APPROVED", admin_notes: notes }),
      },
      { success: true }
    );
  },

  async rejectKyc(id: number | string, notes: string = "Rejected by admin") {
    return request(
      `/sellers/verification/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "REJECTED", admin_notes: notes }),
      },
      { success: true }
    );
  },

  async getCatalog() {
    const fallbackCatalog = [
      { id: 101, title: "Nike Air Jordan 1 Retro", seller: "KicksCentral", price: "PKR 18,500", status: "Active", flagged: false },
      { id: 102, title: "Supreme Box Logo Hoodie", seller: "HypeBeastPK", price: "PKR 24,000", status: "Flagged", flagged: true },
    ];

    try {
      const res = await request<any[]>("/products/", {}, fallbackCatalog);
      if (Array.isArray(res.data) && res.data.length > 0) {
        const catalog = res.data.map((p, i) => ({
          id: typeof p.id === "number" ? p.id : i + 101,
          title: p.name || "Apparel Item",
          seller: p.seller || "Thrift Seller",
          price: `PKR ${p.price || 5000}`,
          status: p.status === "ACTIVE" || p.status === "Active" ? "Active" : "Flagged",
          flagged: p.status === "FLAGGED",
        }));
        return { data: catalog, status: res.status };
      }
    } catch {
      // Fallback
    }

    return { data: fallbackCatalog, status: 200 };
  },

  async getTickets() {
    const fallbackTickets = [
      { id: "DIS-8902", order: "ORD-5432", buyer: "Ali M.", seller: "VintageVault", item: "Nike Dunk Low Panda", amount: 12500, reason: "Item not as described (Condition)", status: "OPEN", opened: "2h ago" },
      { id: "DIS-8895", order: "ORD-5211", buyer: "Sarah K.", seller: "KicksCentral", item: "Carhartt WIP Detroit Jacket", amount: 8900, reason: "Never received item", status: "OPEN", opened: "1d ago" },
    ];

    try {
      const res = await request<any[]>("/admin/tickets", {}, fallbackTickets);
      if (Array.isArray(res.data) && res.data.length > 0) {
        const tickets = res.data.map(t => ({
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
        return { data: tickets, status: res.status };
      }
    } catch {
      // Fallback
    }

    return { data: fallbackTickets, status: 200 };
  },

  async updateTicketStatus(ticketId: string, status: string, notes: string = "") {
    return request(
      `/admin/tickets/${ticketId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status, resolution_notes: notes }),
      },
      { success: true }
    );
  },

  async getOrders() {
    const fallbackOrders = [
      { id: "ORD-9999", buyer: "System", seller: "System", item: "Fallback Item", amount: 0, escrow: "LOCKED", status: "PROCESSING", date: "Today" }
    ];

    try {
      const res = await request<any[]>("/admin/orders");
      if (Array.isArray(res.data) && res.data.length > 0) {
        const orders = res.data.map(o => ({
          id: `ORD-${String(o.id).substring(0, 4).toUpperCase()}`,
          realId: o.id,
          buyer: o.buyer_id || "Buyer",
          seller: o.seller_id || "Seller",
          item: o.product_id || "Item", // We could fetch product details, but for now ID
          amount: o.total_amount || 0,
          escrow: o.status === "FUNDS_IN_ESCROW" || o.status === "SHIPPED" || o.status === "DELIVERED" ? "LOCKED" : o.status === "COMPLETED_PAYOUT" ? "RELEASED" : "PENDING",
          status: o.status || "PROCESSING",
          date: new Date(o.created_at).toLocaleDateString(),
        }));
        return { data: orders, status: res.status };
      }
    } catch {
      // Fallback
    }

    return { data: fallbackOrders, status: 200 };
  }
};
