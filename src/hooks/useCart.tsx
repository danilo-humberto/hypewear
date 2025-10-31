/* eslint-disable react-refresh/only-export-components */
import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/api/products.endpoint";
import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { toast } from "sonner";
import { getCartItems, setCartItems } from "@/utils/storage";
import type { CartItem } from "@/types/order";

type ApiProduct = Omit<CartItem, "quantity" | "totalPrice">;

interface CartContextType {
  cart: CartItem[];
  addToCart: (id: string) => Promise<void>;
  removeQuantityOrProduct: (id: string) => void;
  addQuantity: (id: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => getCartItems());
  const queryClient = useQueryClient();

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [cart]);

  const addToCart = async (id: string) => {
    try {
      let product = queryClient.getQueryData<ApiProduct>(["product", id]);
      if (!product) product = await getProduct(id);

      if (
        !product ||
        !product.id ||
        !product.name ||
        typeof product.price === "undefined"
      ) {
        toast.error("Produto não encontrado ou inválido. Tente novamente.");
        return;
      }

      setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === id);
        if (existingProduct) {
          return prevCart.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.price * (item.quantity + 1),
                }
              : item
          );
        } else {
          const newCartItem: CartItem = {
            ...(product as ApiProduct),
            quantity: 1,
            totalPrice: product.price,
          };
          return [...prevCart, newCartItem];
        }
      });
      toast.success(`Product added to cart`);
    } catch (error) {
      console.error("Falha ao adicionar produto:", error);
      toast.error("Erro ao adicionar produto. Tente novamente.");
    }
  };

  const removeQuantityOrProduct = (id: string) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);
      if (!existingProduct) return prev;
      if (existingProduct.quantity > 1) {
        return prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: item.price * (item.quantity - 1),
              }
            : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const addQuantity = (id: string) => {
    setCart((prev) => {
      return prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.price * (item.quantity + 1),
            }
          : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeQuantityOrProduct,
        addQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
