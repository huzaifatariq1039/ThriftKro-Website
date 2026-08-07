import { request, ApiResponse } from "./apiClient";

export interface ChatMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
}

export const chatService = {
  async getHistory(contactId: string): Promise<ApiResponse<ChatMessage[]>> {
    try {
      const res = await request<ChatMessage[]>(`/chat/history/${contactId}`);
      return { data: Array.isArray(res.data) ? res.data : [], status: res.status };
    } catch (err) {
      console.warn("Failed to fetch chat history:", err);
      return { data: [], status: 200 };
    }
  },

  getWebSocketUrl(userId: string): string {
    const baseUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
    // Convert http/https to ws/wss
    const wsBaseUrl = baseUrl.replace(/^http/, "ws");
    return `${wsBaseUrl}/chat/ws/chat/${userId}`;
  }
};
