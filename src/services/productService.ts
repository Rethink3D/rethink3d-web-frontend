import api from "./api";
import type { ProductPreviewDTO, ProductPageDTO } from "../types/dtos/product";

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
