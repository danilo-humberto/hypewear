import { getClientData, removePendingOrder } from "@/utils/storage";
import { useCreatePaymentMutation } from "./queries/usePayment";
import type { Order } from "@/types/order";
import type { PaymentMethodType, CreatePaymentDto } from "@/types/payments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const usePayment = (
  order: Order,
  onOpenChange: (open: boolean) => void
) => {
  const createPayment = useCreatePaymentMutation();
  const queryClient = useQueryClient();

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

    return createPayment.mutateAsync(
      {
        dto: paymentDto,
        token: authData.access_token,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["clients", order.clientId],
          });
        },
      }
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
