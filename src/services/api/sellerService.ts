import { request, ApiResponse } from "./apiClient";
import { SellerListing } from "@/types/types";
import { mockSellerListings } from "../mockData";

export const sellerService = {
  async getSellerListings(): Promise<ApiResponse<SellerListing[]>> {
    return request<SellerListing[]>("/seller/listings", {}, mockSellerListings);
  },

  async createListing(listing: Omit<SellerListing, "id">): Promise<ApiResponse<SellerListing>> {
    const newListing: SellerListing = {
      ...listing,
      id: Date.now(),
    };
    return request<SellerListing>("/seller/listings", { method: "POST", body: JSON.stringify(listing) }, newListing);
  },

  async deleteListing(id: number): Promise<ApiResponse<{ success: boolean }>> {
    return request<{ success: boolean }>(`/seller/listings/${id}`, { method: "DELETE" }, { success: true });
  },

  async submitVerification(cnic: string): Promise<ApiResponse<{ status: "pending" | "verified" }>> {
    return request<{ status: "pending" | "verified" }>("/seller/verify", { method: "POST", body: JSON.stringify({ cnic }) }, { status: "pending" });
  },
};
