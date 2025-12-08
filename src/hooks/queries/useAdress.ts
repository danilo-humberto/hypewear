import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addAddressRequest,
  deleteAddressRequest,
  setDefaultAddressRequest,
} from "@/api/adresss.endpoint";
import { toast } from "sonner";

export const useAddAddressMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddressRequest,
    onSuccess: () => {
      toast.success("Endereço adicionado!");
      queryClient.invalidateQueries({ queryKey: ["clients", "me"] });
    },
    onError: () => toast.error("Erro ao adicionar endereço!"),
  });
};

export const useDeleteAddressMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddressRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["clients", "me"] }),
    onError: () => toast.error("Erro ao remover endereço!"),
  });
};

export const useSetDefaultAddressMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setDefaultAddressRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["clients", "me"] }),
    onError: () => toast.error("Erro ao definir endereço padrão!"),
  });
};
