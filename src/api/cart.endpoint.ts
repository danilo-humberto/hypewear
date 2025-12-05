import api from "./axios";
import type { Cart, CartItem } from "@/types/cart";

export const addItemToCart = async (
  productId: string,
  quantity: number,
  token: string
): Promise<CartItem> => {
  const { data } = await api.post(
    "/cart/items",
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const updateCartItem = async (
  productId: string,
  quantity: number,
  token: string
): Promise<CartItem> => {
  const { data } = await api.patch(
    "/cart/items",
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const removeCartItem = async (
  productId: string,
  token: string
): Promise<{ removed: boolean }> => {
  const { data } = await api.delete(`/cart/items/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getMyCart = async (token: string): Promise<Cart> => {
  const { data } = await api.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const clearMyCart = async (token: string) => {
  const { data } = await api.post("/cart/clear", {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};