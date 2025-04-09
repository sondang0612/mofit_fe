import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";

type Form = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  district: string;
  streetAddress: string;
  note?: string;
  isDefault: boolean;
};

const fetchData = asyncAuth(async (form: Form) => {
  const response = await axiosInstance.post("addresses", form);
  return response?.data;
});

const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Thêm địa chỉ thành công`);
      queryClient.invalidateQueries({ queryKey: [apiEndpoints.ADDRESSES] });
    },
    onError: (_) => {
      toast.error(`Thêm địa chỉ thất bại`);
    },
  });
};

export { useCreateAddress };
