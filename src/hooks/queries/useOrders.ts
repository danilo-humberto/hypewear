import { createOrder, getOrders } from "@/api/orders.endpoint";
import type { Order, CreateOrderDto } from "@/types/order";
import { useMutation, useQuery } from "@tanstack/react-query";

interface CreateOrderArgs {
  dto: CreateOrderDto;
  token: string;
}

export const useCreateOrderMutation = () => {
  return useMutation<Order, Error, CreateOrderArgs>({
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
