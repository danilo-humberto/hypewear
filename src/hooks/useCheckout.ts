import { useState } from "react";
import {
  getClientData,
  getPendingOrder,
  removePendingOrder,
  setPendingOrder,
} from "@/utils/storage";
import { useCreateOrderMutation, useGetOrder } from "./queries/useOrders";
import { useCart } from "@/hooks/useCart";
import type { Order, CreateOrderDto } from "@/types/order";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const { clearCartLocal } = useCart();
  const createOrder = useCreateOrderMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const [isPaymentOpen, setIsPaymentOpen] = useState(() => {
    return !!getPendingOrder();
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(() => {
    return getPendingOrder();
  });

  const handleCheckout = () => {
    const authData = getClientData("client");

    if (!authData || !authData.client || !authData.access_token) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }

    const orderDto: CreateOrderDto = {
      clientId: authData.client.id,
    };

    createOrder.mutate(
      { dto: orderDto, token: authData.access_token },
      {
        onSuccess: (newOrder: Order) => {
          setCreatedOrder(newOrder);
          setPendingOrder(newOrder);
          clearCartLocal();
          toast.success("Pedido criado com sucesso!");
          if (location.pathname === "/profile") {
            window.location.reload();
          }
          navigate("/profile");
        },
        onError: (error: Error) => {
          const msg =
            (error as any).response?.data?.message || "Falha ao criar pedido.";
          toast.error(msg);
        },
      }
    );
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsPaymentOpen(open);
    if (!open) {
      setCreatedOrder(null);
      removePendingOrder();
    }
  };

  const refetchCreatedOrder = async (orderId: string) => {
    try {
      const token = getClientData("client")?.access_token;
      if (!token) throw new Error("Token não encontrado.");

      const order = await useGetOrder(orderId, token);
      if (!order) throw new Error("Pedido nao encontrado.");

      setCreatedOrder(order.data);
      setPendingOrder(order.data);
      return order.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const clearCreatedOrder = () => {
    setCreatedOrder(null);
    removePendingOrder();
  };

  return {
    isPaymentOpen,
    createdOrder,
    handleCheckout,
    handleModalOpenChange,
    isCheckoutLoading: createOrder.isPending,
    refetchCreatedOrder,
    clearCreatedOrder,
  };
};
