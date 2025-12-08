import { useState } from "react";
import type { Order } from "@/types/order";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { confirmPayment, cancelPayment } from "@/api/payments.endpoint";
import { getClientData } from "@/utils/storage";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

type OrderInformationProps = {
  order: Order | null;
  onUpdate?: () => void; 
};

const OrderInformation = ({ order, onUpdate }: OrderInformationProps) => {
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    const data = getClientData("client");
    if (!data?.access_token) {
      toast.error("Erro de autenticação: Token não encontrado.");
      return null;
    }
    return data.access_token;
  };

  const handleConfirmPayment = async () => {
    if (!order?.payments?.id) {
      return toast.error("Informações de pagamento não encontradas.");
    }

    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      await confirmPayment(order.payments.id, token);
      toast.success("Pagamento confirmado com sucesso!");
      if (onUpdate) onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao confirmar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order?.payments?.id) {
       return toast.error("Pagamento não vinculado.");
    }

    const token = getToken();
    if (!token) return;

    try {
      setLoading(true);
      await cancelPayment(order.payments.id, token);
      toast.info("Pedido cancelado.");
      if (onUpdate) onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao cancelar pedido.");
    } finally {
      setLoading(false);
    }
  };

  if (!order) return null;

  return (
    <div>
      <h2 className="font-semibold text-lg">Itens do Pedido #{order.id.slice(0, 8)}</h2>
      
      <ul className="flex flex-col gap-4 my-4">
        {order.items.map((item) => (
          <li key={item.id} className="flex gap-4 items-center">
            <div className="border rounded-md p-1 bg-secondary/10">
              <img
                src={item.product.imagem}
                alt={item.product.name}
                className="w-16 h-16 object-contain mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col flex-1 justify-between h-full">
              <div className="flex justify-between items-start">
                <p className="font-medium text-sm line-clamp-2">{item.product.name}</p>
              </div>
              
              <div className="flex justify-between items-end mt-1">
                <p className="text-muted-foreground text-sm">{item.quantity}x</p>
                <p className="font-semibold text-sm">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.unitPrice * item.quantity)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <Separator className="my-4" />

      <div className="py-2 flex items-center justify-between mb-4">
        <span className="text-lg font-medium text-muted-foreground">Total:</span>
        <span className="font-bold text-2xl">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(order.total || 0)}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {order.status === "AGUARDANDO_PAGAMENTO" && (
          <>
            <Button
              className="w-full font-bold"
              size={"lg"}
              onClick={handleConfirmPayment}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : null}
              Confirmar Pagamento
            </Button>
            
            <Button 
              variant={"destructive"} 
              className="w-full" 
              size={"lg"}
              onClick={handleCancelOrder}
              disabled={loading}
            >
              Cancelar Pedido
            </Button>
          </>
        )}

        {order.status === "PAGO" && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md text-center font-medium border border-green-200">
            Pedido Pago e Confirmado
          </div>
        )}

        {order.status === "CANCELADO" && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-center font-medium border border-red-200">
            Pedido Cancelado
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInformation;