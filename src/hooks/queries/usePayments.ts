import { createPayment } from "@/api/payments.endpoint";
import type { Order, PaymentMethodType } from "../../types/payments";
import { useMutation } from "@tanstack/react-query";

interface CreatePaymentArgs {
  orderId: string;
  method: PaymentMethodType;
  value: number;
}

export const useCreatePaymentMutation = () => {
  return useMutation<
    Order,
    Error,
    { dto: CreatePaymentArgs; token: string }
  >({
    mutationFn: ({ dto, token }) => createPayment(dto, token),
  });
};