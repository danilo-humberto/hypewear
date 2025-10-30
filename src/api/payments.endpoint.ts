import type { Order } from "@/types/Order";
import api from "./axios";
import type { PaymentMethodType } from "@/types/payments";

interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethodType;
  value: number;
}

export const createPayment = async (
  dto: CreatePaymentDto,
  token: string
): Promise<Order> => {
  const { data } = await api.post("/payments", dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
