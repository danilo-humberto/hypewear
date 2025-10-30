import type { Order, CartItem } from "@/types/order";

const prefixKey = "@auth/"; // A sua chave prefixKey

type Client = {
  access_token: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
};

export const setClientData = (key: string, value: any) => {
  localStorage.setItem(`${prefixKey}${key}`, JSON.stringify(value));
};

export const getClientData = (key: string): Client =>
  JSON.parse(localStorage.getItem(`${prefixKey}${key}`) || "{}");

export const removeClientData = (key: string) =>
  localStorage.removeItem(`${prefixKey}${key}`);

export const setPendingOrder = (order: Order) => {
  localStorage.setItem(`${prefixKey}pendingOrder`, JSON.stringify(order));
};

export const getPendingOrder = (): Order | null => {
  const data = localStorage.getItem(`${prefixKey}pendingOrder`);
  if (!data || data === "{}") {
    return null;
  }
  return JSON.parse(data) as Order;
};

export const removePendingOrder = () => {
  localStorage.removeItem(`${prefixKey}pendingOrder`);
};

export const setCartItems = (items: CartItem[]) => {
  localStorage.setItem(`${prefixKey}cartItems`, JSON.stringify(items));
};

export const getCartItems = (): CartItem[] => {
  const data = localStorage.getItem(`${prefixKey}cartItems`);
  return JSON.parse(data || "[]") as CartItem[];
};

export const removeCartItems = () => {
  localStorage.removeItem(`${prefixKey}cartItems`);
};