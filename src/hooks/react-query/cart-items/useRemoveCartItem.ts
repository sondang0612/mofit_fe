import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

type Form = {
  cartItemId?: number | undefined;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.delete(`cart-items/${form.cartItemId}`);
  return response?.data;
};

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Xoá khỏi giỏ hàng thành công`);
      queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
    },
  });
};

export { useRemoveCartItem };
