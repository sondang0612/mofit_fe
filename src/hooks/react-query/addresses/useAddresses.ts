import axiosInstance from "@/libs/axiosInstance";
import { Address, ApiResponse } from "@/types/api";
import { asyncAuth } from "@/utils/asyncAuth";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey";

interface Params {
  id?: number | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  city?: string | undefined;
  district?: string | undefined;
  streetAddress?: string | undefined;
  note?: string | undefined;
  isDefault?: string | undefined;
  phoneNumber?: string | undefined;
}

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
