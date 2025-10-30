import { createOrder, getOrders } from "@/api/orders.endpoint";
import type { Order, CreateOrderDto } from "@/types/order"; // Certifique-se que o caminho está correto
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateOrderMutation = () => {
  return useMutation<Order, Error, { dto: CreateOrderDto; token: string }>({
    mutationFn: ({ dto, token }) => createOrder(dto, token),
  });
};

export const useGetOrders = (clientId: string) => {
  return useQuery({
    queryKey: ["orders", clientId],
    queryFn: () => getOrders(clientId),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
