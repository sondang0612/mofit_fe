import axiosInstance from "@/libs/axiosInstance";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";
import { ApiResponse, User } from "@/types/api";

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
