import api from "./api";
import type { ConstantNameEnum } from "../types/constants";

export const constantService = {
  getConstant: async (name: ConstantNameEnum): Promise<string | number> => {
    const response = await api.get(`/constant/${name}`);
    return response.data;
  },

  getBatchConstants: async (
    names: ConstantNameEnum[],
  ): Promise<Record<string, string | number>> => {
    const response = await api.get("/constant/batch", {
      params: { names: names.join(",") },
    });
    return response.data;
  },
};
