import { createOrder } from "@/api/orders.endpoint";
import type { Order, CreateOrderDto } from "@/types/order"; // Certifique-se que o caminho está correto
import { useMutation } from "@tanstack/react-query";

export const useCreateOrderMutation = () => {
  return useMutation<
    Order,
    Error, 
    { dto: CreateOrderDto; token: string } 
  >({
    mutationFn: ({ dto, token }) => createOrder(dto, token),
  });
};