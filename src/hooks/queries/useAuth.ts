import { login, register } from "@/api/auth.endpoint";
import type { LoginDto, RegisterDto } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginDto) => login(credentials),
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterDto) => register(credentials),
  });

  return {
    loginMutation,
    registerMutation,
  };
};
