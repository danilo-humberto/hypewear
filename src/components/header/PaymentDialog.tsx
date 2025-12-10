import { useState } from "react";
import { DialogContent, DialogHeader, DialogFooter } from "../ui/dialog";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import type { Order } from "@/types/order";
import type { PaymentMethodType } from "@/types/payments";

import { toast } from "sonner";
import { PaymentReviewDialog } from "./PaymentReviewDialog";
import { usePayment } from "@/hooks/usePayments";

interface PaymentDialogProps {
  order: Order;
  onOpenChange: (open: boolean) => void;
  refetchCreatedOrder: (orderId: string) => Promise<Order>;
}

export const PaymentDialog = ({ order, onOpenChange }: PaymentDialogProps) => {
  const { handleConfirmPayment } = usePayment(order, onOpenChange);

  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethodType | null>(null);

  const [stepConfirmDialogOpen, setStepConfirmDialogOpen] = useState(false);
  const [createdPayment, setCreatedPayment] = useState<any | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleAdvance = async () => {
    if (!selectedMethod) {
      toast.error("Selecione um método.");
      return;
    }

    try {
      setProcessing(true);
      const newPayment = await handleConfirmPayment(selectedMethod);
      toast.success("Pagamento criado com sucesso!");
      setCreatedPayment(newPayment);
      setStepConfirmDialogOpen(true);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Erro ao criar pagamento."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <DialogContent className="w-full lg:min-w-lg">
      <DialogHeader>
        <DialogHeader>Resumo do Pedido</DialogHeader>
        <div className="py-4">
          <ul className="flex flex-col gap-3 mb-4">
            {order?.items && order.items.length > 0 ? (
              order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center gap-3 border rounded-md p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product?.imagem}
                      alt={item.product?.name || "produto"}
                      className="w-16 h-16 object-contain rounded-md shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">
                        {item.product?.name || "Produto"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.product?.description || ""}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {item.quantity} x{" "}
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.unitPrice)}
                    </div>
                    <div className="font-semibold">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format((item.unitPrice || 0) * item.quantity)}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted-foreground">
                Nenhum item no pedido.
              </li>
            )}
          </ul>

          <div className="flex justify-between items-center px-2">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-medium">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(
                order?.items?.reduce(
                  (acc, it) => acc + (it.unitPrice || 0) * it.quantity,
                  0
                ) ??
                  order?.total ??
                  0
              )}
            </span>
          </div>
        </div>
      </DialogHeader>

      <div className="pb-4">
        <h4 className="mb-4 font-medium">Selecione o método de Pagamento:</h4>
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
          onClick={handleAdvance}
          disabled={!selectedMethod || processing}
        >
          {processing ? "Processando..." : "Avançar"}
        </Button>
      </DialogFooter>

      <PaymentReviewDialog
        open={stepConfirmDialogOpen}
        onOpenChange={setStepConfirmDialogOpen}
        order={order}
        paymentMethod={selectedMethod}
        payment={createdPayment}
      />
    </DialogContent>
  );
};
