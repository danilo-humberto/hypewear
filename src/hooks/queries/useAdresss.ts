import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getAddresses,
  addAddressRequest,
  deleteAddressRequest,
  setDefaultAddressRequest,
} from "@/api/adresss.endpoint";

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
      queryClient.invalidateQueries({ queryKey: ["adresss", clientId] });
    },
  });
};

export const useDeleteAddress = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => deleteAddressRequest(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adresss", clientId] });
    },
  });
};

export const useSetDefaultAddress = (clientId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (addressId: string) => setDefaultAddressRequest(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adresss", clientId] });
    },
  });
};
