import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

type Form = {
  productId: number;
  quantity: number;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("cart-items", form);
  return response?.data;
};

const useCreateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Thêm vào giỏ hàng thành công`);
      queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
    },
  });
};

export { useCreateCartItem };
