import { useState } from "react";
import {
  getPendingOrder,
  removePendingOrder,
  setPendingOrder,
} from "@/utils/storage";
import { useCreateOrderMutation } from "@/hooks/queries/useOrders";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/context/AuthContext";
import type { Order, CreateOrderDto } from "@/types/order";
import { toast } from "sonner";

export const useCheckout = () => {
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const createOrder = useCreateOrderMutation();

  const [isPaymentOpen, setIsPaymentOpen] = useState(() => {
    return !!getPendingOrder();
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(() => {
    return getPendingOrder();
  });

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!isAuthenticated || !user) { 
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }

    const orderDto: CreateOrderDto = {
      clientId: user.id,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    createOrder.mutate(
      { dto: orderDto, token: user.token }, 
      {
        onSuccess: (newOrder: Order) => {
          setCreatedOrder(newOrder);
          setPendingOrder(newOrder);
          setIsPaymentOpen(true);
          clearCart();
        },
        onError: (error: Error) => {
          toast.error(error.message || "Falha ao criar pedido.");
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