export interface ProductDimensions {
  width: string;
  height: string;
  depth: string;
  weight: string;
}

export type ServiceTypeEnum = "printing" | "printing_modeling";

export type MaterialTypeEnum =
  | "PLA"
  | "ABS"
  | "PETG"
  | "RESIN"
  | "TPU"
  | "NYLON"
  | "ASA";

export interface CategoryDTO {
  id: number;
  name: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

export const DEFAULT_LIMIT = 20;
export const DEBOUNCE_MS = 400;