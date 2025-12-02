import { removePendingOrder } from "@/utils/storage";
import { useCreatePaymentMutation } from "./queries/usePayment";
import { useAuth } from "@/context/AuthContext";
import type { Order, Payment, PaymentMethodType, CreatePaymentDto } from "@/types/order";
import { toast } from "sonner";

export const usePayment = (
  order: Order,
  onOpenChange: (open: boolean) => void,
) => {
  const { user, isAuthenticated } = useAuth();
  const createPayment = useCreatePaymentMutation();

  const handleConfirmPayment = async (method: PaymentMethodType | null) => {

    if (!method) {
      toast.error("Selecione um método de pagamento.");
      return;
    }

    if (!isAuthenticated || !user) { 
      toast.error("Você não está logado.");
      return;
    }

    const paymentDto: CreatePaymentDto = {
      orderId: order.id,
      method: method,
      value: order.total,
    };

    createPayment.mutate(
      { dto: paymentDto, token: user.token }, 
      {
        onSuccess: (newPayment: Payment) => {
          toast.success("Pagamento criado com sucesso!");
          removePendingOrder();
          onOpenChange(false);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Falha ao processar pagamento.");
        },
      },
    );
  };

  const handleCancel = () => {
    removePendingOrder();
    onOpenChange(false);
  };

  return {
    handleConfirmPayment,
    handleCancel,
    isProcessing: createPayment.isPending,
  };
};