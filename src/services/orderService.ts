import api from "./api";
import type { PaginatedResponse } from "../types/dtos/common";
import type {
  OrderPreviewDTO,
  OrderTypeEnum,
  OrderDetailsDTO,
} from "../types/dtos/order";

export interface OrderFilters {
  page?: number;
  limit?: number;
  type?: OrderTypeEnum;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const orderService = {
  getMakerOrders: async (filters: OrderFilters = {}): Promise<PaginatedResponse<OrderPreviewDTO>> => {
    const response = await api.get<PaginatedResponse<OrderPreviewDTO>>("/order/maker", {
      params: filters,
    });
    return response.data;
  },

  getOrderDetails: async (id: string): Promise<OrderDetailsDTO> => {
    const response = await api.get<OrderDetailsDTO>(`/order/${id}`);
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<void> => {
    await api.patch("/order", { id, status });
  },
};

export default orderService;
