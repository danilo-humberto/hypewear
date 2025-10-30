import api from "./axios";
import type {
  CreatePaymentDto,
  Order,
  Payment,
} from "@/types/order";

export const createPayment = async (
  dto: CreatePaymentDto,
  token: string,
): Promise<Payment> => {
  const { data } = await api.post("/payments", dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const confirmPayment = async (
  paymentId: string,
  token: string,
): Promise<Order> => {
  const { data } = await api.patch(`/payments/${paymentId}/confirm`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const cancelPayment = async (
  paymentId: string,
  token: string,
): Promise<Order> => {
  const { data } = await api.patch(`/payments/${paymentId}/cancel`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getPaymentById = async (
  paymentId: string,
  token: string,
): Promise<Payment> => {
  const { data } = await api.get(`/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllPayments = async (token: string): Promise<Payment[]> => {
  const { data } = await api.get("/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};