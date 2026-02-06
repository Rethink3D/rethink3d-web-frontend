import api from "./api";
import type { MakerPreviewDTO, MakerPageDTO } from "../types/dtos";

export const makerService = {
  getMakers: async (): Promise<MakerPreviewDTO[]> => {
    const response = await api.get<MakerPreviewDTO[]>("/makers");
    return response.data;
  },

  getMakerById: async (id: string): Promise<MakerPageDTO> => {
    const response = await api.get<MakerPageDTO>(`/makers/${id}/page`);
    return response.data;
  },
};
