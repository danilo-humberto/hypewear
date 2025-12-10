import type { ProductFilters } from "@/types/productFilters";
import api from "./axios";
import type { Product } from "@/types/product";
import { getClientData } from "@/utils/storage";

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

export const addProduct = async (payload: Product) => {
  const token = getClientData("client")?.access_token;
  const { data } = await api.post("/product", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
