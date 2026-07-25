import { request } from "./apiClient";

export const adminService = {
  async getOverviewMetrics() {
    return request("/admin/metrics", {}, {
      gmv: "PKR 4,820,000",
      activeListings: 1420,
      kycPending: 12,
      escrowHold: "PKR 380,000",
    });
  },

  async getKycQueue() {
    return request("/admin/kyc", {}, [
      { id: 1, shopName: "KicksCentral", name: "Hamza Malik", cnic: "35202-1234567-1", submitted: "10 mins ago", status: "pending" },
      { id: 2, shopName: "VintageVault", name: "Ayesha Khan", cnic: "42101-9876543-2", submitted: "45 mins ago", status: "pending" },
    ]);
  },

  async approveKyc(id: number) {
    return request(`/admin/kyc/${id}/approve`, { method: "POST" }, { success: true });
  },

  async rejectKyc(id: number) {
    return request(`/admin/kyc/${id}/reject`, { method: "POST" }, { success: true });
  },

  async getCatalog() {
    return request("/admin/catalog", {}, [
      { id: 101, title: "Nike Air Jordan 1 Retro", seller: "KicksCentral", price: "PKR 18,500", status: "Active", flagged: false },
      { id: 102, title: "Supreme Box Logo Hoodie", seller: "HypeBeastPK", price: "PKR 24,000", status: "Flagged", flagged: true },
    ]);
  },
};
