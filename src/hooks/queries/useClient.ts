import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClient, updateClient } from "@/api/clients.endpoint";

export const useClient = (id: string) =>
  useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClient(id),
    retry: 2,
  });

export const useUpdateClient = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => updateClient(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["clients", id], (old: any) => ({
        ...old,
        ...data,
      }));
    },
  });
};
