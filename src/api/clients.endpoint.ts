import api from "./axios";

export const getClient = async (id: string) => {
  const { data } = await api.get(`/clients/${id}`);
  return data;
};

export const updateClient = async (id: string, payload: unknown) => {
  const { data } = await api.patch(`/clients/${id}`, payload);
  return data;
};
