import api from "./api";
import type { ProductPreviewDTO, ProductPageDTO } from "../types/dtos";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const productService = {
  getProducts: async (): Promise<ProductPreviewDTO[]> => {
    const response = await api.get<ProductPreviewDTO[]>("/products/homepage");
    return response.data;
  },

  getProductById: async (id: string): Promise<ProductPageDTO> => {
    const response = await api.get<ProductPageDTO>(`/products/${id}`);
    return response.data;
  },
};
