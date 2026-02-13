import type { ServiceTypeEnum, CategoryDTO, MaterialTypeEnum } from "./common";

export type CustomRequestStatusEnum = "accepted" | "open" | "cancelled";

export interface CustomRequestDTO {
  id: string;
  title: string;
  imageUrl?: string;
  description: string;
  categories?: CategoryDTO[];
  material?: string;
  service: ServiceTypeEnum;
  creationTime: string;
  quantity: number;
}

export interface CustomRequestDetailsDTO {
  id: string;
  title: string;
  projectFiles: { fileName: string; fileUrl: string }[];
  projectLink?: string;
  images?: string[];
  description: string;
  quantity: number;
  categories?: CategoryDTO[];
  materials?: MaterialTypeEnum[];
  service: ServiceTypeEnum;
  status: CustomRequestStatusEnum;
  creationTime: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
  };
  maker?: {
    name: string;
    imageUrl: string;
  };
}
