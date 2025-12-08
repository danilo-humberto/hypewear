import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { toast } from "sonner";
import { getClientData } from "@/utils/storage";
import type { CartItem } from "@/types/cart";
import { 
  addItemToCart, 
  updateCartItem, 
  getMyCart, 
  clearMyCart 
} from "@/api/cart.endpoint";

interface CartContextType {
  cart: CartItem[];
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
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const getToken = () => getClientData("client")?.access_token;

  useEffect(() => {
    const token = getToken();
    if (token) {
      getMyCart(token)
        .then((serverCart) => {
          if (serverCart && serverCart.items) {
            setCart(serverCart.items);
          }
        })
        .catch(err => console.error("Erro ao carregar carrinho", err));
    }
  }, []);

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + (price * item.quantity);
    }, 0);
  }, [cart]);

  const addToCart = async (productId: string) => {
    const token = getToken();
    if (!token) {
      toast.error("Faça login para adicionar ao carrinho.");
      return;
    }

    try {
      const updatedItem = await addItemToCart(productId, 1, token);
      
      setCart((prev) => {
        const exists = prev.find(i => i.productId === productId);
        if (exists) {
          return prev.map(i => i.productId === productId ? updatedItem : i);
        }
        return [...prev, updatedItem];
      });
      
      toast.success("Produto adicionado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar produto.");
    }
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    const token = getToken();
    const quantity = Math.max(0, newQuantity);

    setCart(prev => {
        if (quantity === 0) return prev.filter(i => i.productId !== productId);
        return prev.map(i => i.productId === productId ? { ...i, quantity } : i);
    });

    if (token) {
        try {
            await updateCartItem(productId, quantity, token);
        } catch (err) {
            toast.error("Erro ao sincronizar carrinho.");
        }
    }
  };

  const addQuantity = (productId: string) => {
    const item = cart.find(i => i.productId === productId);
    if (item) updateQuantity(productId, item.quantity + 1);
  };

  const removeQuantityOrProduct = (productId: string) => {
    const item = cart.find(i => i.productId === productId);
    if (!item) return;
    updateQuantity(productId, item.quantity - 1);
  };

  const clearCartApi = async () => {
    const token = getToken();
    if (token) await clearMyCart(token);
    setCart([]);
  };

  const clearCartLocal = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
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