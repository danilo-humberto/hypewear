import api from "./axios";

export const getProducts = async () => {
  const { data } = await api.get("/product");
  return data;
};

export const getProduct = async (id: string) => {
  const { data } = await api.get(`/product/${id}`);
  return data;
};
