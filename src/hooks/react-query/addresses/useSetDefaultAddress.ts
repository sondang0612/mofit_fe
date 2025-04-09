import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";

type Form = {
  id?: number;
};

const fetchData = asyncAuth(async (form: Form) => {
  const response = await axiosInstance.patch(`addresses/${form?.id}/default`);
  return response?.data;
});

const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Đặt lại chỉ mặc định thành công`);
      queryClient.invalidateQueries({ queryKey: [apiEndpoints.ADDRESSES] });
    },
    onError: (_) => {
      toast.error(`Đặt lại địa chỉ mặc định thất bại`);
    },
  });
};

export { useSetDefaultAddress };
