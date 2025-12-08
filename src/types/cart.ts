import type { Product } from "./product";

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product; 
  totalPrice?: number; 
}

export interface Cart {
  id: string;
  clientId: string;
  items: CartItem[];
  subtotal: number;
}