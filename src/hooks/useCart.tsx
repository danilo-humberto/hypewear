/* eslint-disable react-refresh/only-export-components */
import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/api/endpoints";
import React, { useState, createContext, useContext } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartContextType {
  cart: Product[];
  addToCart: (id: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const queryClient = useQueryClient();
  const addToCart = async (id: number) => {
    let product = queryClient.getQueryData<Product>(["product", id]);
    if (!product) product = await getProduct(id);

    if (product) {
      setCart((prev) => [...prev, product]);
      console.log("Product added to cart:", product);
      toast.success(`Product added to cart`);
    } else {
      toast.error("Product not found");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
