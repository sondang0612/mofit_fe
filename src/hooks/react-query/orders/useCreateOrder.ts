import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

type Form = {
  cartItemIds?: any[];
  shippingMethod?: string;
  shippingPrice?: number;
  paymentMethod?: string;
  discount?: number;
  vat?: number;
  subTotal?: number;
  totalPrice?: number;
  addressId?: number;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.post("orders", form);
  return response?.data;
};

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: (data) => {
      if (data?.redirectUrl) {
        window.location.href = data?.redirectUrl;
      } else {
        toast.success(`Đặt hàng thành công`);
        queryClient.invalidateQueries({ queryKey: [queryKey.CART_INFO] });
        window.location.href = `/shop_order_complete?orderId=${data?.data?.id}`;
      }
    },
  });
};

export { useCreateOrder };
