import type { Payment } from "./payments";
import type { Product } from "./product";
import type { Client } from "./Profile"; // vamos criar em seguida

export type OrderStatus =
  | "ABERTO"
  | "AGUARDANDO_PAGAMENTO"
  | "PAGO"
  | "CANCELADO";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal?: number;
  product: Product;
}

export interface Order {
  id: string;
  clientId: string;
  client: Client;
  items: OrderItem[];
  payments?: Payment | null;
  status: OrderStatus;
  total: number;
  subtotal?: number;
  totalQuantity?: number;

  createdAt: string;
  updatedAt: string;
}
