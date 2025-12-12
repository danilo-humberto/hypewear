import { useEffect, useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  Dialog,
} from "../ui/dialog";
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PaymentDialog = ({
  order,
  onOpenChange,
  open,
}: PaymentDialogProps) => {
  const { handleConfirmPayment } = usePayment(order, onOpenChange);

  useEffect(() => {
    console.log(order);
  }, []);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="w-fit">
          <DialogTitle>Resumo do Pedido</DialogTitle>
        </DialogHeader>

        <ul>
          {order?.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <li
                key={item.id}
                className="border rounded-sm p-3 mb-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product?.imagem}
                    alt={item.product?.name}
                    className="w-16 h-16 object-contain rounded-md"
                  />
                  <div>
                    <p className="text-sm font-medium truncate">
                      {item.product?.name}
                    </p>
                    <p className="text-xs text-muted-foreground max-w-[250px] truncate">
                      {item.product?.description}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} x{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.unitPrice)}
                </p>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground">
              Nenhum item no pedido.
            </li>
          )}
        </ul>

        <div className="px-2 flex justify-between items-center">
          <p className="text-sm font-medium">Total:</p>
          <p className="text-sm font-medium">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order?.total || 0)}
          </p>
        </div>

        <div className="pb-4 w-fit">
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
          onPaymentDialogChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};
