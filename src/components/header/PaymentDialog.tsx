import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import type { Order, PaymentMethodType } from "../../types/payments";
import { getClientData } from "@/utils/storage";
import { useCreatePaymentMutation } from "../../hooks/queries/usePayments";
import { toast } from "sonner";

interface PaymentDialogProps {
  order: Order;
  onOpenChange: (open: boolean) => void;
}

export const PaymentDialog = ({ order, onOpenChange }: PaymentDialogProps) => {
  const createPayment = useCreatePaymentMutation();

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);

  const handleConfirmPayment = async () => {
    const authData = getClientData("client");

    if (!selectedMethod || !authData || !authData.access_token) {
      toast.error("Selecione um método e esteja logado.");
      return;
    }

    const paymentDto = {
      orderId: order.id,
      method: selectedMethod,
      value: order.total,
    };

    createPayment.mutate(
      { dto: paymentDto, token: authData.access_token },
      {
        onSuccess: (updatedOrder: Order) => {
          toast.success("Pagamento criado com sucesso!");
          onOpenChange(false);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Falha ao processar pagamento.");
        },
      },
    );
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirmar Pagamento</DialogTitle>
        <DialogDescription>
          Pedido #{order.id.substring(0, 8)}... | Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(order.total)}
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <h4 className="mb-4 font-medium">Selecione o método:</h4>
        <RadioGroup
          onValueChange={(value) =>
            setSelectedMethod(value as PaymentMethodType)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="PIX" id="PIX" />
            <Label htmlFor="PIX">PIX</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CARTAO" id="CARTAO" />
            <Label htmlFor="CARTAO">Cartão de Crédito</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="BOLETO" id="BOLETO" />
            <Label htmlFor="BOLETO">Boleto</Label>
          </div>
        </RadioGroup>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={createPayment.isPending}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmPayment}
          disabled={!selectedMethod || createPayment.isPending}
        >
          {createPayment.isPending ? "Processando..." : "Confirmar Pagamento"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};