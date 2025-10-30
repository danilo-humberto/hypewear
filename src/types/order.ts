
interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  clientId: string;
  items: CreateOrderItemDto[];
}

export interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethodType;
  value: number;
}

export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export type PaymentMethodType = "CARTAO" | "BOLETO" | "PIX";

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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  imagem: string;
  quantity: number;
  totalPrice: number;
}

export type PaymentStatusType = "PENDENTE" | "PAGO" | "CANCELADO";

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethodType;
  status: PaymentStatusType; 
  date: string;
}