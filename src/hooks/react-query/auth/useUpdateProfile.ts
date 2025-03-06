import axiosInstance from "@/libs/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryKey } from "../queryKey";

export type Form = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const fetchData = async (form: Form) => {
  const response = await axiosInstance.put("auth/update-profile", form);
  return response.data;
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fetchData,
    onSuccess: () => {
      toast.success(`Cập nhật thông tin cá nhân thành công`);
      queryClient.invalidateQueries({
        queryKey: [queryKey.PROFILE],
      });
    },
  });
};

export { useUpdateProfile };
