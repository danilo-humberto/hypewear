
interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  clientId: string;
  items: CreateOrderItemDto[];
}

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