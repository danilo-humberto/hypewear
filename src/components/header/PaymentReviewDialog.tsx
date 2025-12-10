import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import type { Order } from "@/types/order";
import type { Payment, PaymentMethodType } from "@/types/payments";
import { toast } from "sonner";
import { getClientData } from "@/utils/storage";
import { cancelPayment, confirmPayment } from "@/api/payments.endpoint";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
  paymentMethod: PaymentMethodType | null;
  payment: Payment | null;
}

export const PaymentReviewDialog = ({
  open,
  onOpenChange,
  order,
  paymentMethod,
  payment,
}: Props) => {
  const handleConfirm = async () => {
    if (!payment) return toast.error("Pagamento não encontrado.");
    try {
      const token = getClientData("client")?.access_token;
      if (!token) throw new Error("Login necessário.");
      await confirmPayment(payment.id, token);
      toast.success("Pagamento confirmado.");
      onOpenChange(false);
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erro ao confirmar pagamento.");
    }
  };

  const handleCancel = async () => {
    if (!payment) return toast.error("Pagamento não encontrado.");
    try {
      const token = getClientData("client")?.access_token;
      if (!token) throw new Error("Login necesario.");
      await cancelPayment(payment.id, token);
      toast.info("Pagamento cancelado.");
      onOpenChange(false);
      onOpenChange(false);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Erro ao cancelar pagamento.");
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Pedido</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-medium mb-2">Resumo do Pedido</h4>
          <ul className="flex flex-col gap-2">
            {order.items?.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.product?.name}</span>
                <span>
                  {item.quantity}x R$
                  {item.unitPrice}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-4 font-medium">
            Total:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order.total)}
          </p>

          <p className="mt-4">
            <strong>Método Selecionado:</strong> {paymentMethod}
          </p>
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={handleCancel}>
            Cancelar pedido
          </Button>

          <Button onClick={handleConfirm}>Confirmar Pagamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
