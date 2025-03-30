import axiosInstance from "@/libs/axiosInstance";
import { removeUndefinedParams } from "@/utils/removeUndefinedParams";
import { useInfiniteQuery } from "@tanstack/react-query";

export enum QueryParam {
  SORT_BY = "sortBy",
  SORT = "sort",
  ATTRIBUTE_VALUE = "attributeValue",
  CATEGORY = "category",
  BRANDS = "brands",
  MIN_PRICE = "minPrice",
  MAX_PRICE = "maxPrice",
  SEARCH_QUERY = "searchQuery",
}

export enum QueryValue {
  CREATED_AT = "createdAt",
  DESC = "DESC",
  ASC = "ASC",
}

const fetchData = async <T>({
  pageParam = 1,
  endpoint,
  limit,
  queryParams,
  queryValues,
}: {
  pageParam: any;
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
    page: pageParam,
    limit,
    ...queryObject,
  });

  const res = await axiosInstance.get(endpoint, { params });

  return {
    data: res.data.data.data,
    total: res.data.data.total,
  };
};

const useInfiniteFetch = <T>({
  endpoint,
  limit = 10,
  queryParams = [],
  queryValues = [],
}: {
  endpoint: string;
  limit?: number;
  queryParams?: string[];
  queryValues?: any[];
}) => {
  const queryKey = [endpoint, { limit, queryParams, queryValues }];

  const queryFn = ({ pageParam }: { pageParam: any }) =>
    fetchData<T>({
      pageParam,
      endpoint,
      limit,
      queryParams,
      queryValues,
    });

  const query = useInfiniteQuery<{ data: T[]; total: number }>({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.flatMap((page) => page.data).length < lastPage.total) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  return {
    ...query,
    data: query.data?.pages.flatMap((page) => page.data) || undefined,
    totalElements: query?.data?.pages ? query?.data?.pages[0]?.total : 0,
  };
};

export { useInfiniteFetch };
