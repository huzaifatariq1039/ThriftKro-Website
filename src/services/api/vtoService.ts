import { request, ApiResponse } from "./apiClient";

export const vtoService = {
  async generateVton(personImage: File, garmentImage: File, garmentCategory: string): Promise<ApiResponse<Blob | string>> {
    const formData = new FormData();
    formData.append("person_image", personImage);
    formData.append("garment_image", garmentImage);
    formData.append("category", garmentCategory);
    const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
    const token = localStorage.getItem("thrift_kro_token") || sessionStorage.getItem("thrift_kro_token") || localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const res = await fetch(`${baseUrl}/vto/generate`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        throw new Error("The AI Engine took too long to respond (timeout). Please try again later.");
      }
      throw err;
    }
  },
};
