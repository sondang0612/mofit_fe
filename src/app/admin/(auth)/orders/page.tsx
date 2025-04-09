"use client";
import Pagination from "@/components/shoplist/Pagination";
import Table, { Column } from "@/components/Table";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { Order, OrderItem } from "@/types/api";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";

const columns: Column<Order>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "Số lượng sản phẩm",
    dataIndex: "orderItems",
    renderItem: (value: OrderItem[]) =>
      value?.map((item, index) => (
        <div key={index}>- {item?.product?.title}</div>
      )),
  },
  {
    title: "Trạng thái đơn hàng",
    dataIndex: "status",
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "paymentMethod",
  },
  {
    title: "Đơn vị vận chuyển",
    dataIndex: "shippingMethod",
  },
  {
    title: "Thành tiền",
    dataIndex: "totalPrice",
    renderItem: (value) => formatPrice(value),
  },
];

const Page = () => {
  const [page, setPage] = React.useState(1);
  const {
    data: orders,
    isFetching,
    totalElements,
  } = useFetch<Order>({
    page: page,
    endpoint: apiEndpoints.ORDERS,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC],
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <Table columns={columns} data={orders} loading={isFetching} />
      <Pagination totalItems={totalElements} onChange={onPageChange} />
    </div>
  );
};

export default Page;
