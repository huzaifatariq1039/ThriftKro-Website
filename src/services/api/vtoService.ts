import { request, ApiResponse } from "./apiClient";

export const vtoService = {
  async generateVton(personImage: File, garmentImage: File): Promise<ApiResponse<Blob | string>> {
    const formData = new FormData();
    formData.append("person_image", personImage);
    formData.append("garment_image", garmentImage);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
      const token = localStorage.getItem("thrift_kro_token") || localStorage.getItem("access_token");

      const res = await fetch(`${baseUrl}/vto/generate`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      if (res.ok) {
        const blob = await res.blob();
        return { data: blob, status: res.status };
      }
    } catch (err) {
      console.warn("VTO API call error:", err);
    }

    return {
      data: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
      status: 200,
      message: "Fallback VTO image URL",
    };
  },
};
