import api from "./axios";
import type { Order, CreateOrderDto } from "../types/order";

export const createOrder = async (
  dto: CreateOrderDto,
  token: string
): Promise<Order> => {
  const { data } = await api.post("/orders", dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getOrders = async (id: string) => {
  try {
    const { data } = await api.get(`/orders/client/${id}`);
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};
