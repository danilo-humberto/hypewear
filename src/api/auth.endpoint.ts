import type { LoginDto, RegisterDto } from "@/types/auth";
import api from "./axios";
import { removeClientData } from "@/utils/storage";

export const login = async (credentials: LoginDto) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const register = async (credentials: RegisterDto) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

export const logout = async () => {
  removeClientData("client");
};
