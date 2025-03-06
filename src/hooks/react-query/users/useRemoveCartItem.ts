import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

type Form = {
  cartItemId?: number | undefined;
};

const fetchData = asyncAuth(async (form: Form) => {
  const response = await axiosInstance.delete(`cart/${form.cartItemId}/me`);
  return response?.data;
});

const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Xoá khỏi giỏ hàng thành công`);
      queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
    },
    onError: (_) => {
      toast.error(`Xoá khỏi giỏ hàng thất bại`);
    },
  });
};

export { useRemoveCartItem };
