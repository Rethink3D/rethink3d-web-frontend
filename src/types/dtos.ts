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

export type ServiceTypeEnum = "printing" | "printing_modeling";

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
  isActive: boolean;
  isPersonalizable: boolean;
  categories: string[];
}

export type MakerStatusEnum = "PENDING" | "ACTIVE" | "PAUSED" | "BLOCKED";

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

export interface UserAddressDTO {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  complement?: string;
}

export interface UserProfileDTO {
  id: string;
  name: string;
  lastName: string;
  identification: string;
  identificationType: string;
  email: string;
  phone: string;
  imageUrl: string;
  address: UserAddressDTO;
  creationTime: string;
  makerId?: string;
}

export interface UpdateMakerDTO {
  name: string;
  description: string;
  categories: string[];
  service: ServiceTypeEnum;
}

export type MakerPaymentStatusEnum =
  | "PENDING"
  | "PROCESSING"
  | "DONE"
  | "FAILED";

export interface MakerPaymentOutputDTO {
  id: string;
  orderId: string;
  creationTime: string;
  status: MakerPaymentStatusEnum;
  pixKey: string;
  paymentDate?: string;
}

export type PixTypeEnum =
  | "CPF"
  | "CNPJ"
  | "EMAIL"
  | "PHONE_NUMBER"
  | "RANDOM_KEY";

export interface PayoutDataOutputDTO {
  id: string;
  type: PixTypeEnum;
  nick?: string;
  key: string;
  isMain: boolean;
}

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

export interface CategoryDTO {
  id: number;
  name: string;
}

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
