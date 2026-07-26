import { request, ApiResponse } from "./apiClient";

export const vtoService = {
  async generateVton(personImage: File, garmentImage: File): Promise<ApiResponse<Blob | string>> {
    const formData = new FormData();
    formData.append("person_image", personImage);
    formData.append("garment_image", garmentImage);
    const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";
    const token = localStorage.getItem("thrift_kro_token") || localStorage.getItem("access_token");

    const res = await fetch(`${baseUrl}/vto/generate`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      let parsedErr: any;
      try {
        parsedErr = JSON.parse(errText);
      } catch {
        parsedErr = { detail: errText || res.statusText };
      }
      throw new Error(parsedErr.detail || `VTO Generation failed (${res.status})`);
    }

    const blob = await res.blob();
    return { data: blob, status: res.status };
  },
};
