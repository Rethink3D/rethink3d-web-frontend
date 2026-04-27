import api from "./api";
import type {
  CustomRequestDTO,
  CustomRequestDetailsDTO,
} from "../types/dtos/request";
import type { PaginatedResponse } from "../types/dtos/common";

export interface CustomRequestFilters {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  categories?: number[] | string[];
  service?: string[];
  materials?: string[];
}

export const customRequestService = {
  getGlobalRequests: async (filters: CustomRequestFilters = {}): Promise<PaginatedResponse<CustomRequestDTO>> => {
    const response = await api.get<PaginatedResponse<CustomRequestDTO>>("/custom-request", { 
      params: filters,
      paramsSerializer: { indexes: null }
    });
    return response.data;
  },

  getMakerRequests: async (filters: CustomRequestFilters = {}): Promise<PaginatedResponse<CustomRequestDTO>> => {
    const response = await api.get<PaginatedResponse<CustomRequestDTO>>("/custom-request/maker", { 
      params: filters,
      paramsSerializer: { indexes: null }
    });
    return response.data;
  },

  getCustomRequestDetails: async (
    id: string,
  ): Promise<CustomRequestDetailsDTO> => {
    const response = await api.get<CustomRequestDetailsDTO>(
      `/custom-request/${id}`,
    );
    return response.data;
  },
};
