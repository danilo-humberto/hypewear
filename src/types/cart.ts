import type { Product } from "./product";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;

  createdAt: string;
  updatedAt: string;

  product: Product;
}

export interface Cart {
  id: string;
  clientId: string;
  items: CartItem[];
  subtotal: number;

  createdAt: string;
  updatedAt: string;
}
