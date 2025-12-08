import { getProduct, getProducts } from "@/api/products.endpoint";
import type { ProductFilters } from "@/types/productFilters";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (filters: ProductFilters) =>
  useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    retry: 2,
  });

export const useProductById = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    retry: 2,
  });
