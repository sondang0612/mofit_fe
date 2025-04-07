import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, User } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";
import { ERole } from "@/utils/constants/role.enum";

const fetchData = asyncAuth(
  async () => {
    const response = await axiosInstance.get("auth/profile");
    return response?.data;
  },
  { roles: [ERole.ADMIN, ERole.USER] }
);

const useProfile = () => {
  const { data, ...query } = useQuery<ApiResponse<User>>({
    queryKey: [queryKey.PROFILE],
    queryFn: fetchData,
  });

  return {
    ...query,
    data: data?.data,
  };
};

export { useProfile };
