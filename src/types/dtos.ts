export interface ProductDimensions {
  width: string;
  height: string;
  depth: string;
  weight: string;
}

export interface ProductPreviewDTO {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  productDimensions?: ProductDimensions;
  maker: string;
  makerId: string;
  rating: number;
  isPersonalizable: boolean;
  isActive: boolean;
  categories: string[];
}

export type ServiceTypeEnum = "PRINT" | "MODEL" | "PRINT_AND_MODEL";

export interface MakerPreviewDTO {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  service: ServiceTypeEnum;
  categories: string[];
}

export interface ProductImageDTO {
  id: number;
  url: string;
}

export interface MakerDTO {
  id: string;
  name: string;
  service: ServiceTypeEnum;
  imageUrl: string;
  categories: string[];
  creationTime: string;
  rating: number;
}

export type MaterialTypeEnum =
  | "PLA"
  | "ABS"
  | "PETG"
  | "RESIN"
  | "TPU"
  | "NYLON"
  | "ASA";

export interface ProductPageDTO {
  id: string;
  name: string;
  categories: string[];
  images: ProductImageDTO[];
  price: number;
  basePrice: number;
  description: string;
  materials: MaterialTypeEnum[];
  productDimensions?: ProductDimensions;
  maker: MakerDTO;
  productionDays: number;
  isActive: boolean;
  isPersonalizable: boolean;
}

export interface MakerProductDTO {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

export type MakerStatusEnum =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "REJECTED"
  | "SUSPENDED";

export interface MakerPageDTO {
  id: string;
  imageUrl?: string;
  name?: string;
  description?: string;
  categories?: string[];
  service?: ServiceTypeEnum;
  status: MakerStatusEnum;
  products?: MakerProductDTO[];
  creationTime?: string;
  canEdit?: boolean;
}

export interface ProductIdParamsDTO {
  ids: string[];
}
