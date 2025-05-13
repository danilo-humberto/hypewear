import {
  getAllProductsOrByCategory,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const useProductsByCategory = (category: string) =>
  useQuery({
    queryKey: ["products", category],
    queryFn: () => getProductsByCategory(category),
    enabled: !!category,
  });

export const useProductById = (id: number) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

export const useAllProductsOrByCategory = (category: string) =>
  useQuery({
    queryKey: ["products", category],
    queryFn: () => getAllProductsOrByCategory(category),
    enabled: !!category,
  });
