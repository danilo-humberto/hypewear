import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/orders.endpoint";

export const useGetOrders = (clientId: string) => {
  return useQuery({
    queryKey: ["orders", clientId],
    queryFn: () => getOrders(clientId),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
