import { addProduct, getProduct, getProducts } from "@/api/products.endpoint";
import type { Product } from "@/types/product";
import type { ProductFilters } from "@/types/productFilters";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Product) => addProduct(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};
