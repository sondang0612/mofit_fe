import { useAuthStore } from "@/hooks/store/useAuthStore";
import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";
import { cookiesKey } from "@/libs/cookiesKey";

type Form = {
  email: string;
  password: string;
};

export type LoginData = {
  access_token: string;
  fullName: string;
  message: string;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("auth/login", form);
  return response.data;
};

const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: async (data: LoginData) => {
      Cookies.set(cookiesKey.ACCESS_TOKEN, data?.access_token);
      window.location.reload();
    },
    onError: (_) => {
      toast.error(`Tài khoản hoặc mật khẩu không đúng`);
    },
  });
};

export { useLogin };
