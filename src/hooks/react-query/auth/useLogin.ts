import axiosInstance from "@/libs/axiosInstance";
import { cookiesKey } from "@/libs/cookiesKey";
import { ERole } from "@/utils/constants/role.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Form = {
  username?: string;
  password?: string;
  role?: ERole;
};

export type LoginData = {
  access_token: string;
  fullName: string;
  message: string;
  role: ERole;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("auth/login", form);
  return response.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: fetchData,
    onSuccess: async (data: LoginData) => {
      Cookies.set(cookiesKey.ACCESS_TOKEN, data?.access_token);
      Cookies.set(cookiesKey.ROLE, data?.role);
      if (data?.role === ERole.ADMIN) {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/";
      }
    },
    onError: (_) => {
      toast.error(`Tài khoản hoặc mật khẩu không đúng`);
    },
  });
};

export { useLogin };
