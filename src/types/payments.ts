export type PaymentMethodType = "CARTAO" | "BOLETO" | "PIX";

export interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethodType;
  value: number;
}
