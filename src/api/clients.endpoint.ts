import api from "./axios";

export const getClients = async () => {
  const { data } = await api.get("/clients");
  return data;
};

export const getClient = async (id: string) => {
  const { data } = await api.get(`/clients/${id}`);
  return data;
};

export const updateClient = async (id: string, payload: unknown) => {
  const { data } = await api.patch(`/clients/${id}`, payload);
  return data;
};

export const deleteClient = async (id: string) => {
  const { data } = await api.delete(`/clients/${id}`);
  return data;
};
