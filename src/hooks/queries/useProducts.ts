import { getProduct, getProducts } from "@/api/products.endpoint";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    retry: 2,
  });

export const useProductById = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    retry: 2,
  });
