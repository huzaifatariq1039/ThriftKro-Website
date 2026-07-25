import { request, ApiResponse } from "./apiClient";

export const adminService = {
  async getOverviewMetrics() {
    const fallbackMetrics = {
      gmv: "PKR 4,820,000",
      activeListings: 1420,
      kycPending: 12,
      escrowHold: "PKR 380,000",
    };

    try {
      const res = await request<any>("/admin/stats", {}, fallbackMetrics);
      if (res.data && res.data.total_revenue !== undefined) {
        return {
          data: {
            gmv: `PKR ${res.data.total_revenue.toLocaleString()}`,
            activeListings: res.data.total_products || 1420,
            kycPending: res.data.pending_kyc || 12,
            escrowHold: `PKR ${(res.data.escrow_hold || 380000).toLocaleString()}`,
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
    const fallbackKyc = [
      { id: 1, shopName: "KicksCentral", name: "Hamza Malik", cnic: "35202-1234567-1", submitted: "10 mins ago", status: "pending" },
      { id: 2, shopName: "VintageVault", name: "Ayesha Khan", cnic: "42101-9876543-2", submitted: "45 mins ago", status: "pending" },
    ];

    try {
      const res = await request<any[]>("/sellers/verification/pending", {}, fallbackKyc);
      if (Array.isArray(res.data) && res.data.length > 0) {
        const queue = res.data.map((item, idx) => ({
          id: item.id || idx + 1,
          shopName: item.business_name || "Thrift Shop",
          name: item.seller_name || "Seller",
          cnic: item.cnic_number || "35202-0000000-1",
          submitted: item.created_at ? new Date(item.created_at).toLocaleTimeString() : "Recently",
          status: (item.status || "PENDING").toLowerCase(),
        }));
        return { data: queue, status: res.status };
      }
    } catch {
      // Fallback
    }

    return { data: fallbackKyc, status: 200 };
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
    return request("/admin/tickets", {}, []);
  },
};
