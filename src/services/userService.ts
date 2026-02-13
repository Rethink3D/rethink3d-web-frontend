import api from "./api";
import type { UserProfileDTO } from "../types/dtos/user";

export const userService = {
  getProfile: async (): Promise<UserProfileDTO> => {
    const response = await api.get<UserProfileDTO>("/users/profile");
    return response.data;
  },
};
