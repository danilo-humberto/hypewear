import { createOrder } from "@/api/orders.endpoint";
import type { Order, CreateOrderDto } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

interface CreateOrderArgs {
  dto: CreateOrderDto;
  token: string;
}

export const useCreateOrderMutation = () => {
  return useMutation<Order, Error, CreateOrderArgs>({
    mutationFn: ({ dto, token }) => createOrder(dto, token),
  });
};