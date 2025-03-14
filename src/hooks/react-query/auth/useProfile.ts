import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, User } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = asyncAuth(async () => {
  const response = await axiosInstance.get("auth/profile");
  return response?.data;
});

const useProfile = () => {
  return useQuery<ApiResponse<User>>({
    queryKey: [queryKey.PROFILE],
    queryFn: fetchData,
  });
};

export { useProfile };
