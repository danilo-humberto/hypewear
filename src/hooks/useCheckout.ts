import { useState } from "react";
import {
  getClientData,
  getPendingOrder,
  removePendingOrder,
  setPendingOrder,
} from "@/utils/storage";
import { useCreateOrderMutation } from "./queries/useOrders";
import { useCart } from "@/hooks/useCart";
import type { Order, CreateOrderDto } from "@/types/order";
import { toast } from "sonner";

export const useCheckout = () => {
  const { clearCartLocal } = useCart();
  const createOrder = useCreateOrderMutation();

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
          setIsPaymentOpen(true);
          clearCartLocal(); 
          toast.success("Pedido criado com sucesso!");
        },
        onError: (error: Error) => {
            const msg = (error as any).response?.data?.message || "Falha ao criar pedido.";
            toast.error(msg);
        },
      },
    );
  };

  const handleModalOpenChange = (open: boolean) => {
    setIsPaymentOpen(open);
    if (!open) {
      setCreatedOrder(null);
      removePendingOrder();
    }
  };

  return {
    isPaymentOpen,
    createdOrder,
    handleCheckout,
    handleModalOpenChange,
    isCheckoutLoading: createOrder.isPending,
  };
};