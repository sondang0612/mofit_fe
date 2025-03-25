import axiosInstance from "@/libs/axiosInstance";
import { cookiesKey } from "@/libs/cookiesKey";
import { ERole } from "@/utils/constants/role.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

type Form = {
  email?: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

export type RegisterData = {
  access_token: string;
  fullName: string;
  message: string;
  role: ERole;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("auth/register", form);
  return response.data;
};

const useRegister = () => {
  return useMutation({
    mutationFn: fetchData,
    onSuccess: async (data: RegisterData) => {
      Cookies.set(cookiesKey.ACCESS_TOKEN, data?.access_token);
      Cookies.set(cookiesKey.ROLE, data?.role);
      window.location.href = "/";
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.message);

      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(`Đăng ký thất bại!!!`);
      }
    },
  });
};

export { useRegister };
