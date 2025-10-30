import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getAddresses,
  addAddressRequest,
  deleteAddressRequest,
  setDefaultAddressRequest,
} from "@/api/adresss.endpoint";
import { toast } from "sonner";

export const useGetAddresses = (clientId: string) =>
  useQuery({
    queryKey: ["adresss", clientId],
    queryFn: () => getAddresses(clientId),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useAddAddress = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => addAddressRequest(payload),
    onSuccess: () => {
      toast.success("Endereço adicionado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["adresss", clientId] });
    },
    onError: () => toast.error("Erro ao adicionar endereço!"),
  });
};

export const useDeleteAddress = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => deleteAddressRequest(addressId),
    onSuccess: () => {
      toast.success("Endereço removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["adresss", clientId] });
    },
    onError: () => toast.error("Erro ao remover endereço!"),
  });
};

export const useSetDefaultAddress = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => setDefaultAddressRequest(addressId),
    onSuccess: () => {
      toast.success("Endereço padrão alterado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["adresss", clientId] });
    },
    onError: () => toast.error("Erro ao alterar endereço padrão!"),
  });
};
