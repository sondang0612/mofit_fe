import axiosInstance from "@/libs/axiosInstance";
import { removeUndefinedParams } from "@/utils/removeUndefinedParams";
import { useQuery } from "@tanstack/react-query";

export enum QueryParam {
  SORT_BY = "sortBy",
  SORT = "sort",
  ATTRIBUTE_VALUE = "attributeValue",
  CATEGORY = "category",
  BRANDS = "brands",
  MIN_PRICE = "minPrice",
  MAX_PRICE = "maxPrice",
  ID = "id",
  TXN_REF = "txnRef",
}

export enum QueryValue {
  CREATED_AT = "createdAt",
  DESC = "DESC",
  ASC = "ASC",
}

const fetchData = async <T>({
  page,
  endpoint,
  limit,
  queryParams,
  queryValues,
}: {
  page: number;
  endpoint: string;
  limit?: number;
  queryParams?: string[];
  queryValues?: any[];
}): Promise<{ data: T[]; total: number }> => {
  const queryObject = queryParams?.reduce((acc, key, index) => {
    acc[key] = queryValues?.[index];
    return acc;
  }, {} as Record<string, any>);

  const params = removeUndefinedParams({
    page,
    limit,
    ...queryObject,
  });

  const res = await axiosInstance.get(endpoint, { params });

  return {
    data: res.data.data.data,
    total: res.data.data.total,
  };
};

const useFetch = <T>({
  endpoint,
  page = 1,
  limit = 10,
  queryParams = [],
  queryValues = [],
  enabled,
}: {
  endpoint: string;
  page?: number;
  limit?: number;
  queryParams?: string[];
  queryValues?: any[];
  enabled?: any;
}) => {
  const queryKey = [endpoint, page, { limit, queryParams, queryValues }];

  const queryFn = () =>
    fetchData<T>({
      page,
      endpoint,
      limit,
      queryParams,
      queryValues,
    });

  const query = useQuery<{ data: T[]; total: number }>({
    queryKey,
    queryFn,
    placeholderData: (previousData) => previousData,
    enabled,
  });

  return {
    ...query,
    data: query.data?.data || [],
    totalElements: query.data?.total || 0,
  };
};

export { useFetch };
