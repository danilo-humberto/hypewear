import { getClientData, removePendingOrder } from "@/utils/storage";
import { useCreatePaymentMutation } from "./queries/usePayment";
import type { Order } from "@/types/order";
import type { Payment, PaymentMethodType, CreatePaymentDto } from "@/types/payments";
import { toast } from "sonner";

export const usePayment = (
  order: Order,
  onOpenChange: (open: boolean) => void,
) => {
  const createPayment = useCreatePaymentMutation();

  const handleConfirmPayment = async (method: PaymentMethodType | null) => {
    const authData = getClientData("client");

    if (!method) {
      toast.error("Selecione um método de pagamento.");
      return;
    }

    if (!authData || !authData.access_token) {
      toast.error("Você não está logado.");
      return;
    }

    const paymentDto: CreatePaymentDto = {
      orderId: order.id,
      method: method,
    };

    createPayment.mutate(
      { dto: paymentDto, token: authData.access_token },
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