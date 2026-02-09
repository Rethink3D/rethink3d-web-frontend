import api from "./api";
import type { CustomRequestDTO, CustomRequestDetailsDTO } from "../types/dtos";

export const customRequestService = {
  getGlobalRequests: async (): Promise<CustomRequestDTO[]> => {
    const response = await api.get<CustomRequestDTO[]>("/custom-request");
    return response.data;
  },

  getMakerRequests: async (): Promise<CustomRequestDTO[]> => {
    const response = await api.get<CustomRequestDTO[]>("/custom-request/maker");
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
