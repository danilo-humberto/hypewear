import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClient, updateClient } from "@/api/clients.endpoint";
import { toast } from "sonner";

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
      toast.success("Dados atualizados com sucesso!");
      queryClient.setQueryData(["clients", id], (old: any) => ({
        ...old,
        ...data,
      }));
    },
    onError: () => toast.error("Erro ao atualizar dados!"),
  });
};
