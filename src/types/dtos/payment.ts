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
