import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

type Form = {
  productId: number;
  quantity: number;
};

const fetchData = asyncAuth(async (form: Form) => {
  const response = await axiosInstance.post("users/add-to-cart", form);
  return response?.data;
});

const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Thêm vào giỏ hàng thành công`);
      queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
    },
    onError: (_) => {
      toast.error(`Thêm vào giỏ hàng thất bại`);
    },
  });
};

export { useAddToCart };
