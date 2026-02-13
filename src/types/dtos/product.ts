import type { ProductDimensions, MaterialTypeEnum } from "./common";
import type { MakerDTO } from "./maker";

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

export interface ProductImageDTO {
  id: number;
  url: string;
}

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

export interface ProductIdParamsDTO {
  ids: string[];
}
