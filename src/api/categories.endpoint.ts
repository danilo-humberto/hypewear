import api from "./axios";

export const getCategories = async () => {
  const { data } = await api.get("/category");
  return data;
};

export const addCategory = async (name: string, token: string) => {
  const { data } = await api.post(
    "/category",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
