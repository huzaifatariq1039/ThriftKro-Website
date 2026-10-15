import { request, ApiResponse } from "./apiClient";
import { SellerVerificationStatusResponse } from "@/types/types";

export const sellerService = {
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
    const res = await request<any>(
      "/sellers/verify",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    const statusVal = res.data?.status?.toLowerCase() === "approved" ? "verified" : "pending";
    return { data: { status: statusVal }, status: res.status };
  },

  /**
   * Get the seller's current verification status including rate-limit info.
   */
  async getVerificationStatus(): Promise<ApiResponse<SellerVerificationStatusResponse>> {
    const res = await request<any>("/sellers/verification/me");
    const verificationStatus = String(res.data?.verification_status || "").toUpperCase();
    if (!["UNVERIFIED", "PENDING", "APPROVED", "REJECTED"].includes(verificationStatus)) {
      throw new Error("The server returned an invalid seller verification state");
    }
    return {
      data: {
        verification_status: verificationStatus as SellerVerificationStatusResponse["verification_status"],
        is_verified: res.data?.is_verified === true,
        submissions_today: res.data?.submissions_today ?? 0,
        max_submissions_per_day: res.data?.max_submissions_per_day ?? 3,
        can_submit: res.data?.can_submit === true,
        freeze_until: res.data?.freeze_until || null,
        latest_request: res.data?.latest_request || null,
      },
      status: res.status,
    };
  },
};
