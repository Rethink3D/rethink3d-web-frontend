import api from "./api";
import type {
  ProductPreviewDTO,
  ProductPageDTO,
  PaginatedResponse,
  CategoryDTO,
} from "../types/dtos/index";

export interface ProductSearchParams {
  page?: number;
  limit?: number;
  searchFor?: string;
  categories?: number[];
  isPersonalizable?: boolean;
}

export const productService = {
  searchProducts: async (
    params: ProductSearchParams = {},
  ): Promise<{ items: ProductPreviewDTO[]; total: number }> => {
    const { categories, ...rest } = params;
    const queryParams: Record<string, unknown> = { ...rest };

    if (categories && categories.length > 0) {
      queryParams.categories = categories;
    }

    const response = await api.get<{
      products: { items: ProductPreviewDTO[]; total: number };
      makers: { items: unknown[]; total: number };
    }>("/search", { params: queryParams, paramsSerializer: { indexes: null } });

    return response.data.products;
  },

  getProductCategories: async (): Promise<CategoryDTO[]> => {
    const response = await api.get<CategoryDTO[]>("/search/category", {
      params: { onlyWithProducts: true },
    });
    return response.data;
  },

  getHomepageProducts: async (): Promise<ProductPreviewDTO[]> => {
    const response = await api.get<ProductPreviewDTO[]>("/products/homepage");
    return response.data;
  },
  getProductById: async (id: string): Promise<ProductPageDTO> => {
    const response = await api.get<ProductPageDTO>(`/products/${id}`);
    return response.data;
  },

  getProductsCatalog: async (
    params: { page?: number; limit?: number } = {},
  ): Promise<PaginatedResponse<ProductPreviewDTO>> => {
    const response = await api.get<PaginatedResponse<ProductPreviewDTO>>(
      "/products",
      { params },
    );
    return response.data;
  },

  getMakerProducts: async (
    params: {
      page?: number;
      limit?: number;
      searchFor?: string;
      makerId?: string;
      isPersonalizable?: boolean;
      isActive?: boolean;
    } = {},
  ): Promise<PaginatedResponse<ProductPreviewDTO>> => {
    const response = await api.get<PaginatedResponse<ProductPreviewDTO>>(
      "/products",
      { params, paramsSerializer: { indexes: null } },
    );
    return response.data;
  },
};
