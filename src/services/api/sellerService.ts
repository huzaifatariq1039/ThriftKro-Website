import { request, ApiResponse } from "./apiClient";
import { SellerListing, SellerVerificationStatusResponse } from "@/types/types";
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
        return { data: listings, status: res.status };
      }
      return { data: [], status: 200 };
    } catch (err) {
      console.warn("Failed to get seller listings", err);
      return { data: [], status: 500 };
    }
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

  /**
   * Submit a full verification request matching the backend SellerVerificationCreate schema.
   */
  async submitVerification(payload: {
    business_name: string;
    business_type: string;
    phone_number: string;
    address: string;
    city: string;
    cnic_number?: string;
    cnic_front_url: string;
    cnic_back_url: string;
    shop_photo_urls?: string[];
    business_reg_url?: string;
  }): Promise<ApiResponse<{ status: "pending" | "verified" | "approved" }>> {
    // ── Always save to localStorage FIRST so Admin portal works offline ──
    try {
      const mockQueue = JSON.parse(localStorage.getItem("mock_kyc_queue") || "[]");
      mockQueue.push({
        id: `KYC-${Math.floor(1000 + Math.random() * 9000)}`,
        shop: payload.business_name,
        type: payload.business_type,
        cnic: payload.cnic_number || "35202-0000000-1",
        phone: payload.phone_number,
        city: payload.city,
        address: payload.address,
        submitted: new Date().toLocaleString("en-PK"),
        revenue: "PKR 0",
        status: "PENDING",
        cnicFront: payload.cnic_front_url,
        cnicBack: payload.cnic_back_url,
        aiVerified: (payload as any).ai_verified || false,
        productsProof: (payload as any).products_proof || [],
      });
      localStorage.setItem("mock_kyc_queue", JSON.stringify(mockQueue));
    } catch (err) {
      console.warn("Failed to update mock KYC queue", err);
    }

    // ── Then attempt the real API call ──
    try {
      const res = await request<any>(
        "/sellers/verify",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );
      const statusVal = res.data?.status?.toLowerCase() === "approved" ? "verified" : "pending";
      return { data: { status: statusVal }, status: res.status };
    } catch {
      // Backend offline — return a mock "pending" response so the UI still works
      return { data: { status: "pending" }, status: 201 };
    }
  },

  /**
   * Get the seller's current verification status including rate-limit info.
   */
  async getVerificationStatus(): Promise<ApiResponse<SellerVerificationStatusResponse>> {
    const fallback: SellerVerificationStatusResponse = {
      verification_status: "UNVERIFIED",
      is_verified: false,
      submissions_today: 0,
      max_submissions_per_day: 3,
      can_submit: true,
      freeze_until: null,
      latest_request: null,
    };

    try {
      const res = await request<any>("/sellers/verification/me");
      return {
        data: {
          verification_status: res.data?.verification_status || "UNVERIFIED",
          is_verified: res.data?.is_verified || false,
          submissions_today: res.data?.submissions_today ?? 0,
          max_submissions_per_day: res.data?.max_submissions_per_day ?? 3,
          can_submit: res.data?.can_submit ?? true,
          freeze_until: res.data?.freeze_until || null,
          latest_request: res.data?.latest_request || null,
        },
        status: res.status,
      };
    } catch {
      return { data: fallback, status: 200 };
    }
  },
};
