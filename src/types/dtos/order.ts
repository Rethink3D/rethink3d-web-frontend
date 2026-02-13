import type { ServiceTypeEnum } from "./common";

export type OrderTypeEnum = "product" | "custom";

export type OrderStatusEnum =
  | "awaiting_payment"
  | "awaiting_maker"
  | "on_going"
  | "delayed"
  | "new_deadline"
  | "ready"
  | "awaiting_confirmation"
  | "refund_in_analysis"
  | "refund_in_process"
  | "partial_refund_in_process"
  | "partial_refund"
  | "refunded"
  | "done";

export interface OrderPreviewDTO {
  id: string;
  imageUrl?: string;
  creationTime: string;
  service: ServiceTypeEnum;
  totalValue: number;
  type: OrderTypeEnum;
  status: OrderStatusEnum;
}

export interface OrderHistoryDTO {
  id: string;
  eventTime: string;
  status: OrderStatusEnum;
  reason?: string;
}

export interface QuotationItemDTO {
  id: string;
  description: string;
  quantity: number;
  estimatedProductionTime: number;
  price: number;
  priceWithFee: number;
}

export interface QuotationDTO {
  id: string;
  creationTime: string;
  items: QuotationItemDTO[];
}

export interface OrderDetailsDTO {
  id: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
    address: {
      state: string;
      city: string;
    };
  };
  maker: {
    id: string;
    name: string;
    imageUrl: string;
    address: {
      state: string;
      city: string;
    };
  };
  products: {
    product: {
      id: string;
      name: string;
      imageUrl: string;
      makerName?: string;
    };
    quantity: number;
    price: number;
    totalValue: number;
    estimatedProductionTime: number;
  }[];
  quotation?: QuotationDTO;
  type: OrderTypeEnum;
  totalEstimatedProductionTime: number;
  creationTime: string;
  history: OrderHistoryDTO[];
  status: OrderStatusEnum;
  paymentFee: number;
  intermediaryFee?: number;
  subtotal: number;
  totalValue: number;
  deadline: string;
  encodedImage?: string;
  payload?: string;
}
