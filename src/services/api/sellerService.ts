import { request, ApiResponse } from "./apiClient";
import { SellerListing } from "@/types/types";
import { mockSellerListings } from "../mockData";

export const sellerService = {
  async getSellerListings(): Promise<ApiResponse<SellerListing[]>> {
    try {
      const res = await request<any[]>("/products/", {}, mockSellerListings);
      if (Array.isArray(res.data) && res.data.length > 0) {
        const listings: SellerListing[] = res.data.map((p, i) => ({
          id: typeof p.id === "number" ? p.id : i + 1,
          name: p.name || "Apparel Item",
          price: p.price || 2000,
          views: p.views || Math.floor(Math.random() * 200) + 10,
          likes: p.likes || Math.floor(Math.random() * 50),
          category: p.category || "Men",
          status: p.status === "Active" || p.status === "APPROVED" ? "Active" : "Pending",
          img: p.image_url || p.img || "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800",
        }));
        return { data: listings, status: 200 };
      }
    } catch {
      // Fallback to mock
    }
    return { data: mockSellerListings, status: 200 };
  },

  async createListing(listing: Omit<SellerListing, "id">): Promise<ApiResponse<SellerListing>> {
    const res = await request<any>(
      "/products/",
      {
        method: "POST",
        body: JSON.stringify({
          name: listing.name,
          description: "Seller dashboard created item",
          price: listing.price,
          original_price: listing.price * 1.3,
          category: listing.category || "Jackets",
          department: "Men",
          size: "M",
          brand: "Thrifted",
          condition: "Good",
          image_url: listing.img,
          images: [],
          tags: [],
        }),
      }
    );

    return {
      data: {
        id: res.data?.id || Date.now(),
        name: res.data?.name || listing.name,
        price: res.data?.price || listing.price,
        views: 0,
        likes: 0,
        category: res.data?.category || listing.category,
        status: "Active",
        img: res.data?.image_url || listing.img,
      },
      status: res.status,
    };
  },

  async deleteListing(id: number): Promise<ApiResponse<{ success: boolean }>> {
    const res = await request<{ success: boolean }>(`/products/${id}`, { method: "DELETE" });
    return { data: { success: true }, status: res.status };
  },

  async submitVerification(payload: { business_name?: string; cnic?: string; cnic_number?: string; cnic_front_url?: string; cnic_back_url?: string } | string): Promise<ApiResponse<{ status: "pending" | "verified" | "approved" }>> {
    const cnicVal = typeof payload === "string" ? payload : payload.cnic_number || payload.cnic || "35202-0000000-1";
    const bizName = typeof payload === "object" ? payload.business_name || "Thrift Shop" : "Thrift Shop";

    const res = await request<any>(
      "/sellers/verify",
      {
        method: "POST",
        body: JSON.stringify({
          business_name: bizName,
          cnic_number: cnicVal,
          cnic_front_url: typeof payload === "object" ? payload.cnic_front_url || "https://example.com/front.jpg" : "https://example.com/front.jpg",
          cnic_back_url: typeof payload === "object" ? payload.cnic_back_url || "https://example.com/back.jpg" : "https://example.com/back.jpg",
          business_address: "Lahore, Pakistan",
        }),
      }
    );
    const statusVal = res.data?.status?.toLowerCase() === "approved" ? "verified" : "pending";
    return { data: { status: statusVal }, status: res.status };
  },

  async getVerificationStatus(): Promise<ApiResponse<{ verification_status: string }>> {
    const res = await request<any>("/sellers/verification/me");
    return { data: { verification_status: res.data?.verification_status || "pending" }, status: res.status };
  },
};
