import api from "./api";
import type {
  OrderPreviewDTO,
  OrderTypeEnum,
  OrderDetailsDTO,
} from "../types/dtos/order";

export const orderService = {
  getMakerOrders: async (type?: OrderTypeEnum): Promise<OrderPreviewDTO[]> => {
    const response = await api.get<OrderPreviewDTO[]>("/order/maker", {
      params: { type },
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
