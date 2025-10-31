import { createPayment } from "@/api/payments.endpoint";
import type { Payment, CreatePaymentDto } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

interface CreatePaymentArgs {
  dto: CreatePaymentDto;
  token: string;
}

export const useCreatePaymentMutation = () => {
  return useMutation<Payment, Error, CreatePaymentArgs>({
    mutationFn: ({ dto, token }) => createPayment(dto, token),
  });
};
