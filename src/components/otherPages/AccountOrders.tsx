"use client";
import Table, { Column } from "@/components/Table";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { Order as IOrder, OrderItem } from "@/types/api";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import {
  EOrderStatus,
  EOrderStatusLabel,
  EPaymentMethod,
  EPaymentMethodLabel,
  EShippingMethod,
  EShippingMethodLabel,
} from "@/utils/constants/order.enum";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";
import { FiEye } from "react-icons/fi";
import Pagination from "../shoplist/Pagination";

const columns: Column<IOrder>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "Hình ảnh",
    dataIndex: "orderItems",
    renderItem: (value: OrderItem[]) => {
      return (
        <Image
          width={80}
          height={80}
          style={{ height: "fit-content" }}
          src={value[0] ? `${value[0].product?.imgSrc}` : EDefaultValue.IMAGE}
          alt={
            value[0] ? `${value[0].product?.title}` : EDefaultValue.ALT_IMAGE
          }
        />
      );
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    renderItem: (value) => EOrderStatusLabel[value as EOrderStatus],
  },
  {
    title: "Thanh toán",
    dataIndex: "paymentMethod",
    renderItem: (value) => EPaymentMethodLabel[value as EPaymentMethod],
  },
  {
    title: "Vận chuyển",
    dataIndex: "shippingMethod",
    renderItem: (value) => EShippingMethodLabel[value as EShippingMethod],
  },
  {
    title: "Thành tiền",
    dataIndex: "totalPrice",
    renderItem: (value) => formatPrice(value),
  },
  {
    title: "",
    renderItem: () => {
      return (
        <div data-toggle="tooltip" data-placement="top" title="Chi tiết">
          <FiEye size={18} className="cursor-pointer" />
        </div>
      );
    },
  },
];

const Page = () => {
  const [page, setPage] = React.useState(1);
  const {
    data: orders,
    isFetching,
    totalElements,
  } = useFetch<IOrder>({
    page: page,
    endpoint: `${apiEndpoints.ORDERS}`,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC],
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__order">
        <p className="notice">Quản lý đơn hàng</p>

        <div>
          <Table columns={columns} data={orders} loading={isFetching} />
          <Pagination totalItems={totalElements} onChange={onPageChange} />
        </div>
      </div>
    </div>
  );
};

export default Page;
