import api from "./axios";

export const getAddresses = async (clientId: string) => {
  try {
    const { data } = await api.get(`/address/me/${clientId}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) return [];
    throw error;
  }
};

export const addAddressRequest = async (payload: unknown) => {
  const { data } = await api.post("/address", payload);
  return data;
};

export const deleteAddressRequest = async (id: string) => {
  await api.delete(`/address/${id}`);
  return id;
};

export const setDefaultAddressRequest = async (id: string) => {
  const { data } = await api.patch(`/address/${id}/default`);
  return data;
};
