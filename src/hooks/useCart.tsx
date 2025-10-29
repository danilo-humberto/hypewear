/* eslint-disable react-refresh/only-export-components */
import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/api/products.endpoint";
import React, { useState, createContext, useContext } from "react";
import { toast } from "sonner";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  totalPrice: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartContextType {
  cart: Product[];
  addToCart: (id: number) => Promise<void>;
  removeQuantityOrProduct: (id: number) => void;
  addQuantity: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const queryClient = useQueryClient();
  const addToCart = async (id: number) => {
    try {
      let product = queryClient.getQueryData<Product>(["product", id]);
      if (!product) product = await getProduct(id);

      if (!product) {
        toast.error("Product not found. Please try again.");
        return;
      }

      if (product) {
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === id);
          if (existingProduct) {
            const updatedCart = prevCart.map((item) => {
              if (item.id === id) {
                const newQuantity = item.quantity + 1;
                const totalPrice =
                  item.quantity >= 1 ? item.price * newQuantity : item.price;
                return {
                  ...item,
                  quantity: newQuantity,
                  totalPrice,
                };
              } else {
                return item;
              }
            });
            return updatedCart;
          } else {
            const updatedCart = [
              ...prevCart,
              { ...product, quantity: 1, totalPrice: product.price },
            ];
            return updatedCart;
          }
        });
        toast.success(`Product added to cart`);
      }
    } catch {
      toast.error("Error adding product. Please try again.");
    }
  };

  const removeQuantityOrProduct = (id: number) => {
    setCart((prev) => {
      const existingProduct = prev.find((item) => item.id === id);

      if (!existingProduct) return prev;

      if (existingProduct.quantity > 1) {
        return prev.map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity - 1;
            const totalPrice = item.price * newQuantity;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice,
            };
          }

          return item;
        });
      }

      return prev.filter((item) => item.id !== id);
    });
  };

  const addQuantity = (id: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + 1;
          const totalPrice = item.price * newQuantity;
          return {
            ...item,
            quantity: newQuantity,
            totalPrice,
          };
        }
        return item;
      });
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeQuantityOrProduct, addQuantity }}
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
