import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";

type Params = {
  id?: number;
};

const fetchData = asyncAuth(async (params: Params) => {
  const response = await axiosInstance.delete(`addresses/${params?.id}`);
  return response?.data;
});

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Xoá địa chỉ thành công`);
      queryClient.invalidateQueries({ queryKey: [apiEndpoints.ADDRESSES] });
    },
    onError: (error: any) => {
      if (error?.response?.data?.message?.includes("delete default")) {
        toast.error(`Không thể xoá địa chỉ mặt định`);
      } else {
        toast.error(`Xoá địa chỉ thất bại`);
      }
    },
  });
};

export { useDeleteAddress };
