import axiosInstance from "@/libs/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type Form = {
  email?: string;
  name?: string;
  message?: string;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("contacts", form);
  return response?.data;
};

const useCreateContact = () => {
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Gửi biểu mẫu liên hệ thành công!!`);
    },
  });
};

export { useCreateContact };
