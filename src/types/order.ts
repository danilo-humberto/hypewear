import type { Product } from "./Product";
import type { Client } from "./Profile";

interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  clientId: string;
  items: CreateOrderItemDto[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
  product: Product;
}

export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export interface Order {
  id: string;
  clientId: string;
  client: Client;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  total: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
}
