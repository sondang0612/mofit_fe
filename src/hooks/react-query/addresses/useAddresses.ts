import axiosInstance from "@/libs/axiosInstance";
import { Address, ApiResponse } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

const fetchData = asyncAuth(async () => {
  const response = await axiosInstance.get("addresses");
  return response?.data?.data;
});

const useAddresses = () => {
  return useQuery<ApiResponse<Address[]>>({
    queryKey: [queryKey.MY_ADDRESSES],
    queryFn: fetchData,
  });
};

export { useAddresses };
