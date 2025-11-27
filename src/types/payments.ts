import type { Order } from "./order";

export type PaymentMethodType = "CARTAO" | "BOLETO" | "PIX";

export type PaymentStatusType = "PENDENTE" | "PAGO" | "CANCELADO";

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethodType;
  status: PaymentStatusType;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentWithOrder extends Payment {
  order: Order;
}

export interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethodType;
}
