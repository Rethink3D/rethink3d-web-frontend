import type { ServiceTypeEnum } from "./common";

export type MakerStatusEnum = "PENDING" | "ACTIVE" | "PAUSED" | "BLOCKED";

export interface MakerPreviewDTO {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  service: ServiceTypeEnum;
  categories: string[];
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

export interface MakerProductDTO {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  isActive: boolean;
  isPersonalizable: boolean;
  categories: string[];
}

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

export interface UpdateMakerDTO {
  name: string;
  description: string;
  categories: string[];
  service: ServiceTypeEnum;
}
