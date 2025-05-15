import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart } = useCart();

  return (
    <div className="lg:flex lg:items-center lg:gap-1 lg:cursor-pointer lg:p-2 lg:rounded-md lg:transition-all lg:duration-300 lg:hover:bg-accent relative">
      <ShoppingBag />
      <span className="absolute -top-2 lg:-top-0 -right-1 lg:-right-0 bg-foreground text-background w-4 h-4 text-[12px] rounded-full flex items-center justify-center">
        {cart.length}
      </span>
    </div>
  );
};

export default Cart;
