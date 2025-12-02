import { login, register } from "@/api/auth.endpoint";
import type { LoginDto, RegisterDto } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAuthQueries = () => { 
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginDto) => login(credentials),
    onSuccess: (data) => {
      loginUser(data);
      navigate('/');
    }
  });

  const registerMutation = useMutation({
    mutationFn: (credentials: RegisterDto) => register(credentials),
    onSuccess: (data) => {
      loginUser(data);
      navigate('/auth/login');
    }
  });

  return {
    loginMutation,
    registerMutation,
  };
};