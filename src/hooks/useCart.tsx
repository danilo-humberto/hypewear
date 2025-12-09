import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { toast } from "sonner";
import { getClientData } from "@/utils/storage";
import type { Cart, CartItem } from "@/types/cart";
import {
  addItemToCart,
  updateCartItem,
  getMyCart,
  clearMyCart,
} from "@/api/cart.endpoint";

interface CartContextType {
  cart: Cart | null;
  items: CartItem[];
  addToCart: (productId: string) => Promise<void>;
  removeQuantityOrProduct: (productId: string) => void;
  addQuantity: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCartLocal: () => void;
  clearCartApi: () => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  const getToken = () => getClientData("client")?.access_token;

  useEffect(() => {
    const token = getToken();
    if (token) {
      getMyCart(token)
        .then((serverCart) => {
          if (serverCart && serverCart.items) {
            setCart(serverCart);
          }
        })
        .catch((err) => console.error("Erro ao carregar carrinho", err));
    }
  }, []);

  const items = useMemo(() => cart?.items ?? [], [cart]);

  const total = useMemo(() => {
    if (cart) return cart.subtotal;

    return items.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cart, items]);

  const addToCart = async (productId: string) => {
    const token = getToken();
    if (!token) {
      toast.error("Faça login para adicionar ao carrinho.");
      return;
    }

    const existingItem = items.find((i) => i.productId === productId);

    if (existingItem) {
      addQuantity(productId);
      return;
    }

    try {
      await addItemToCart(productId, 1, token);

      const serverCart = await getMyCart(token);
      setCart(serverCart);

      toast.success("Produto adicionado!");
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message ??
        (Array.isArray(err?.response?.data?.message)
          ? err.response.data.message[0]
          : null);

      if (apiMessage) {
        if (
          apiMessage === "Quantidade solicitada maior que o estoque disponível"
        ) {
          toast.error(
            "Você já atingiu a quantidade máxima disponível em estoque."
          );
        } else {
          toast.error(apiMessage);
        }
      } else {
        toast.error("Erro ao atualizar o carrinho.");
      }
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    const token = getToken();
    if (!token) {
      toast.error("Faça login para atualizar ao carrinho.");
      return;
    }
    const quantity = Math.max(0, newQuantity);

    try {
      await updateCartItem(productId, quantity, token);

      const serverCart = await getMyCart(token);
      setCart(serverCart);
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.message ??
        (Array.isArray(err?.response?.data?.message)
          ? err.response.data.message[0]
          : null);

      if (apiMessage) {
        if (
          apiMessage === "Quantidade solicitada maior que o estoque disponível"
        ) {
          toast.error(
            "Você já atingiu a quantidade máxima disponível em estoque."
          );
        } else {
          toast.error(apiMessage);
        }
      } else {
        toast.error("Erro ao atualizar o carrinho.");
      }
    }
  };

  const addQuantity = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;

    const estoque = item.product?.estoque ?? 0;
    const reserved = item?.product?.reserved ?? 0;
    const available = estoque - reserved;

    if (item.quantity >= available) {
      toast.error("Quantidade máxima disponível em estoque já foi atingida.");
      return;
    }
    updateQuantity(productId, item.quantity + 1);
  };

  const removeQuantityOrProduct = (productId: string) => {
    const item = items.find((i) => i.productId === productId);
    if (!item) return;
    updateQuantity(productId, item.quantity - 1);
  };

  const clearCartApi = async () => {
    const token = getToken();
    if (!token) {
      toast.error("Faça login para limpar o carrinho.");
      return;
    }

    try {
      await clearMyCart(token);
      setCart({ items: [], subtotal: 0 });
      toast.success("Carrinho limpo!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao limpar carrinho.");
    }
  };

  const clearCartLocal = () => {
    setCart({ items: [], subtotal: 0 });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        items,
        addToCart,
        removeQuantityOrProduct,
        addQuantity,
        updateQuantity,
        clearCartLocal,
        clearCartApi,
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
