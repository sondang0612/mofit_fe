import axiosInstance from "@/libs/axiosInstance";
import { useMutation } from "@tanstack/react-query";

type Form = {
  orderInfo: string;
  totalPrice: number;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("payment-transaction", form);
  return response?.data;
};

const useCreatePaymentTransaction = () => {
  return useMutation({
    mutationFn: fetchData,
    onSuccess: (data) => {
      window.location.href = data;
    },
  });
};

export { useCreatePaymentTransaction };
