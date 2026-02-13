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
