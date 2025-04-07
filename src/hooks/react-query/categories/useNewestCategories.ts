import axiosInstance from "@/libs/axiosInstance";
import { ApiResponse, Category } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = async () => {
  const response = await axiosInstance.get("categories/newest");
  return response?.data;
};

const useNewestCategory = () => {
  const { data, ...query } = useQuery<ApiResponse<Category>>({
    queryKey: [queryKey.NEWEST_CATEGORY],
    queryFn: fetchData,
  });

  return { ...query, data: data?.data };
};

export { useNewestCategory };
