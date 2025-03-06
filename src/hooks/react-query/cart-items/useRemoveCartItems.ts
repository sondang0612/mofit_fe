import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

type Form = {
  cartItemIds: any[];
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("cart-items/remove", form);
  return response?.data;
};

const useRemoveCartItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Xoá khỏi giỏ hàng thành công`);
      queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
    },
  });
};

export { useRemoveCartItems };
