import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, User } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

type Params = {
  page: number;
  limit: number;
};

const fetchData = asyncAuth(async (params?: Params) => {
  const response = await axiosInstance.get("users", { params });
  return response?.data?.data;
});

const useUsers = (params: Params) => {
  return useQuery<ApiResponse<User[]>>({
    queryKey: [queryKey.USERS, params],
    queryFn: () => fetchData(params),
  });
};

export { useUsers };
