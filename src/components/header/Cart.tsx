import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
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
import { Dialog } from "../ui/dialog";
import { PaymentDialog } from "./PaymentDialog";

const Cart = () => {
  const { items, removeQuantityOrProduct, addQuantity, updateQuantity, total } =
    useCart();
  const {
    isPaymentOpen,
    createdOrder,
    handleCheckout,
    handleModalOpenChange,
    isCheckoutLoading,
  } = useCheckout();

  return (
    <Dialog open={isPaymentOpen} onOpenChange={handleModalOpenChange}>
      <Sheet>
        <SheetTrigger asChild>
          <button className="lg:flex lg:items-center lg:gap-1 lg:cursor-pointer lg:p-2 lg:rounded-md lg:transition-all lg:duration-300 lg:hover:bg-accent relative">
            <ShoppingBag size={25} />
            <span className="absolute -top-2 lg:-top-0 -right-1 lg:-right-0 bg-foreground text-background w-4 h-4 text-[12px] rounded-full flex items-center justify-center">
              {items.length}
            </span>
          </button>
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
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                Seu carrinho está vazio.
              </p>
            ) : (
              items.map((item) => (
                <Card key={item.id} className="w-full h-[160px] flex-1">
                  <CardContent className="flex gap-2 px-2 w-full">
                    <img
                      src={item.product.imagem}
                      alt={item.product.name}
                      className="w-24 h-[6.5rem] object-contain rounded-md shrink-0"
                    />
                    <div className="flex flex-col gap-1 justify-between flex-1 min-w-0">
                      <div className="flex flex-col gap-2 min-w-0">
                        <p className="text-sm truncate">{item.product.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {item.product.description}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <span className="font-bold">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(item.product.price * item.quantity)}
                        </span>
                        <div className="flex border border-muted rounded-sm items-center mr-2">
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              removeQuantityOrProduct(item.productId)
                            }
                            className="rounded-none"
                          >
                            <Minus />
                          </Button>
                          <input
                            key={item.id + "-" + item.quantity}
                            type="number"
                            defaultValue={item.quantity}
                            min={0}
                            onBlur={(e) => {
                              const raw = e.target.value;

                              if (raw === "") {
                                e.target.value = String(item.quantity);
                                return;
                              }

                              const parsed = Number(raw);

                              if (Number.isNaN(parsed) || parsed < 0) {
                                e.target.value = String(item.quantity);
                                return;
                              }

                              // aqui sim a gente manda para o backend
                              updateQuantity(item.productId, parsed);
                            }}
                            className="w-10 h-10 text-center border-x border-x-muted bg-transparent focus:outline-none appearance-none"
                          />
                          <Button
                            variant={"ghost"}
                            onClick={() => addQuantity(item.productId)}
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

          <SheetFooter className="p-0 sticky w-full bottom-0 bg-background">
            <div className="border-t border-t-muted-foreground p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">Total:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}
                </span>
              </div>
              <Button
                className="w-full mt-5 h-[5vh]"
                onClick={handleCheckout}
                disabled={isCheckoutLoading || items.length === 0}
              >
                {isCheckoutLoading ? "Processando..." : "Finalizar Compra"}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {createdOrder && (
        <PaymentDialog
          order={createdOrder}
          onOpenChange={handleModalOpenChange}
        />
      )}
    </Dialog>
  );
};

export default Cart;
