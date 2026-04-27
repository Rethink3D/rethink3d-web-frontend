import api from "./api";
import type {
  MakerPreviewDTO,
  MakerPageDTO,
  PaginatedResponse,
} from "../types/dtos/index";

export interface MakerCatalogParams {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string; 
  service?: string[];
}


export const makerService = {
  getMakersCatalog: async (
    params: MakerCatalogParams = {},
  ): Promise<PaginatedResponse<MakerPreviewDTO>> => {
    const response = await api.get<PaginatedResponse<MakerPreviewDTO>>(
      "/makers",
      { params },
    );
    return response.data;
  },

  getMakersPreview: async (limit = 20): Promise<MakerPreviewDTO[]> => {
    const response = await api.get<PaginatedResponse<MakerPreviewDTO>>(
      "/makers",
      { params: { page: 1, limit } },
    );
    return response.data.items;
  },

  getMakerById: async (id: string): Promise<MakerPageDTO> => {
    const response = await api.get<MakerPageDTO>(`/makers/${id}/page`);
    return response.data;
  },
  getMakersCategories: async (): Promise<{ id: string; name: string }[]> => {
    const response = await api.get<{ id: string; name: string }[]>(
      "/makers/categories",
    );
    return response.data;
  },
};
