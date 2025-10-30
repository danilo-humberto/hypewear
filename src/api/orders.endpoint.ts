import api from "@/api/axios";

export const getOrders = async (id: string) => {
  try {
    const { data } = await api.get(`/orders/client/${id}`);
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) return [];
    throw err;
  }
};
