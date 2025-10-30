export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  numberPhone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  clientId: string;
  client: Client;
  items: OrderItem[];
  status: "ABERTO" | "PAGO" | "CANCELADO";
  subtotal: number;
  total: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
}
