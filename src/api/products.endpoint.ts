import type { ProductFilters } from "@/types/productFilters";
import api from "./axios";

export const getProducts = async (params: ProductFilters) => {
  const queries = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== "" && value !== null
    )
  );
  const { data } = await api.get("/product", { params: queries });
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await api.get(`/product/${id}`);
  return data;
};
