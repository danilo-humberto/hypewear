import type { Payment } from "./payments";
import type { Product } from "./product";
import type { Client } from "./Profile";

export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export interface CreateOrderDto {
  clientId: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export interface Order {
  id: string;
  clientId: string;
  client?: Client;
  items: OrderItem[];
  payments?: Payment | null;
  status: OrderStatus;
  total: number;
  createdAt: string;
  updatedAt: string;
}