import api from "./axios";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await api.get("/products/categories");
  return data;
};

export const getProductsByCategory = async (category: string) => {
  const { data } = await api.get(`/products/category/${category}`);
  return data;
};

export const getAllProductsOrByCategory = async (category: string) => {
  if (!category || category === "All") {
    return getProducts();
  } else {
    return getProductsByCategory(category);
  }
};
