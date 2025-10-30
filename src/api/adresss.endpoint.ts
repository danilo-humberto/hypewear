import api from "./axios";

export const getAddresses = async (clientId: string) => {
  try {
    const { data } = await api.get(`/addresss/client/${clientId}`);
    return data;
  } catch (error: any) {
    if (err.response?.status === 404) return [];
    throw error;
  }
};

export const addAddressRequest = async (payload: unknown) => {
  const { data } = await api.post("/addresss", payload);
  return data;
};

export const deleteAddressRequest = async (id: string) => {
  await api.delete(`/addresss/${id}`);
  return id;
};

export const setDefaultAddressRequest = async (id: string) => {
  const { data } = await api.patch(`/addresss/${id}/default`);
  return data;
};
