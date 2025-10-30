import api from "./axios";
import type { Order, CreateOrderDto } from "../types/order"; 

export const createOrder = async (
  dto: CreateOrderDto,
  token: string,
): Promise<Order> => {
  const { data } = await api.post("/orders", dto, {
    headers: {
      Authorization: `Bearer ${token}`, 
      },
  });
  return data;
};