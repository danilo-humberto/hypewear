import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import type { Order, PaymentMethodType } from "../../types/payments";
import { getClientData } from "@/utils/storage"; 

async function callCreatePaymentApi(
  dto: {
    orderId: string;
    method: PaymentMethodType;
    value: number;
  },
  token: string,
) {
  const response = await fetch("/payments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Falha ao processar pagamento");
  }
  return response.json();
}

interface PaymentDialogProps {
  order: Order;
  onOpenChange: (open: boolean) => void;
}

export const PaymentDialog = ({ order, onOpenChange }: PaymentDialogProps) => {
  const authData = getClientData("client");
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = async () => {
    if (!selectedMethod || !authData || !authData.access_token) {
      alert("Selecione um método de pagamento e esteja logado.");
      return;
    }

    setIsProcessing(true);
    try {
      const createPaymentDto = {
        orderId: order.id,
        method: selectedMethod,
        value: order.total,
      };

      const newPayment = await callCreatePaymentApi(
        createPaymentDto,
        authData.access_token,
      );

      console.log("Pagamento criado!", newPayment);
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
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
        {/* ... (JSX do RadioGroup) ... */}
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => onOpenChange(false)}
          disabled={isProcessing}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmPayment}
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? "Processando..." : "Confirmar Pagamento"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};