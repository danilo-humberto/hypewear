export type PaymentMethodType = "CARTAO" | "BOLETO" | "PIX";

export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export interface Order {
  id: string;
  clientId: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethodType;
  value: number;
}