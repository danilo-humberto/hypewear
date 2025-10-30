import { useCart } from "@/hooks/useCart";
import { getClientData } from "@/utils/storage"; // <-- CORRIGIDO
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState, useMemo } from "react";
import { Dialog } from "../ui/dialog";
import { PaymentDialog } from "./PaymentDialog";
import type { Order } from "../../types/payments";

async function createOrderInBackend(
  cartItems: any[],
  clientId: string,
  token: string,
): Promise<Order> {
  const createOrderDto = {
    clientId: clientId,
    items: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  const response = await fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(createOrderDto),
  });

  const contentType = response.headers.get("content-type");
  let responseData;

  if (contentType && contentType.indexOf("application/json") !== -1) {
    responseData = await response.json();
  } else {
    responseData = await response.text();
  }

  if (!response.ok) {

    if (typeof responseData === "object" && responseData.message) {
      throw new Error(responseData.message);
    }
    throw new Error(responseData || `Falha na requisição: ${response.statusText}`);
  }
  if (typeof responseData !== "object" || !responseData.id) {
    throw new Error("O backend não retornou um pedido válido.");
  }
  
  return responseData as Order;
}

const Cart = () => {
  const { cart, removeQuantityOrProduct, addQuantity } = useCart();

  const authData = getClientData("client");

  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    if (!authData || !authData.client || !authData.access_token) {
      console.error("Usuário não logado. Redirecionando para o login...");
      return;
    }

    setIsLoading(true);
    try {

      const newOrder = await createOrderInBackend(
        cart,
        authData.client.id, 
        authData.access_token, 
      );

      setCreatedOrder(newOrder);
      setIsPaymentOpen(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [cart]);

  return (
    <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:flex lg:items-center lg:gap-1 lg:cursor-pointer lg:p-2 lg:rounded-md lg:transition-all lg:duration-300 lg:hover:bg-accent relative"
          >
            <ShoppingBag />
            <span className="absolute -top-2 lg:-top-0 -right-1 lg:-right-0 bg-foreground text-background w-4 h-4 text-[12px] rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full overflow-y-scroll [&>button]:hidden hide-scrollbar"
        >
          <SheetHeader className="sticky top-0 bg-background w-full border-b border-b-muted-foreground flex-row justify-between">
            <div>
              <SheetTitle className="text-2xl">Cart</SheetTitle>
              <SheetDescription>Seu carrinho de compras</SheetDescription>
            </div>
            <SheetClose className="cursor-pointer">
              <X className="text-muted-foreground" />
            </SheetClose>
          </SheetHeader>
          <div className="px-2 flex flex-col gap-2">
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Seu carrinho está vazio.
              </p>
            ) : (
              cart.map((item) => (
                <Card key={item.id} className="w-full h-[160px] flex-1">
                  <CardContent className="flex gap-2 px-2 w-full">
                    <div className="px-2 flex flex-col gap-2">
            {cart.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Seu carrinho está vazio.
              </p>
            ) : (
              cart.map((item) => (
                <Card key={item.id} className="w-full h-[160px] flex-1">
                  <CardContent className="flex gap-2 px-2 w-full">
                    <img
                      src={item.imagem}
                      alt={item.name}
                      className="w-24 h-[6.5rem] object-contain rounded-md shrink-0"
                    />
                    <div className="flex flex-col gap-1 justify-between flex-1 min-w-0">
                      <div className="flex flex-col gap-2 min-w-0">
                        <p className="text-sm truncate">{item.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span className="font-bold">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(item.totalPrice)}
                        </span>
                        <div className="flex border border-muted rounded-sm items-center mr-2">
                          <Button
                            variant={"ghost"}
                            onClick={() => removeQuantityOrProduct(item.id)}
                            className="rounded-none"
                          >
                            <Minus />
                          </Button>
                          <Button
                            variant={"ghost"}
                            className="border-x border-x-muted rounded-none hover:bg-transparent dark:hover:bg-transparent"
                          >
                            {item.quantity}
                          </Button>
                          <Button
                            variant={"ghost"}
                            onClick={() => addQuantity(item.id)}
                            className="rounded-none"
                          >
                            <Plus />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <SheetFooter className="p-0 sticky w-full bottom-0 bg-background">
            <div className="border-t border-t-muted-foreground p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">Total:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(total)}
                </span>
              </div>
              <Button
                className="w-full mt-5 h-[5vh]"
                onClick={handleCheckout}
                disabled={isLoading || cart.length === 0}
              >
                {isLoading ? "Criando pedido..." : "Checkout"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {createdOrder && (
        <PaymentDialog
          order={createdOrder}
          onOpenChange={setIsPaymentOpen}
        />
      )}
    </Dialog>
  );
};

export default Cart;