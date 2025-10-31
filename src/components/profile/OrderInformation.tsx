import type { Order } from "@/types/order";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { confirmPayment } from "@/api/payments.endpoint";

type OrderInformationProps = {
  order: Order | null;
  id: string;
};

const OrderInformation = ({ order, id }: OrderInformationProps) => {
  return (
    <div>
      <h2 className="font-semibold">Itens do Pedido</h2>
      <ul className="flex flex-col gap-3 my-4">
        {order?.items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <img
              src={item.product.imagem}
              alt={item.product.name}
              className="w-20 h-20"
            />
            <div className="flex flex-col justify-between">
              <div>
                <p>{item.product.name}</p>
                <p>{item.quantity}x</p>
              </div>
              <div>
                <p className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Separator />
      <div className="py-3 flex items-center justify-between">
        <span className="text-xl">Total:</span>
        <span className="font-semibold text-xl">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BRL",
          }).format(order?.total || 0)}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {order?.status === "AGUARDANDO_PAGAMENTO" && (
          <>
            <Button
              className="w-full"
              size={"lg"}
              onClick={() => confirmPayment(order.payments[0].id, id)}
            >
              Confirmar Pagamento
            </Button>
            <Button variant={"destructive"} className="w-full" size={"lg"}>
              Cancelar Pedido
            </Button>
          </>
        )}

        {order?.status === "CANCELADO" && (
          <p className="text-red-500 text-center">Pedido cancelado</p>
        )}
      </div>
    </div>
  );
};

export default OrderInformation;
