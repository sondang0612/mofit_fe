"use client";
import Pagination from "@/components/shoplist/Pagination";
import Table, { Column } from "@/components/Table";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { Product } from "@/types/api";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin4Line } from "react-icons/ri";

const columns: Column<Product>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 50,
  },
  {
    title: "Hình ảnh",
    dataIndex: "imgSrc",
    renderItem: (value) => (
      <Image width={60} height={60} src={value} alt="product" />
    ),
  },
  { title: "Tên", dataIndex: "title" },
  {
    title: "Loại",
    dataIndex: "category",
    renderItem: (value) => value?.name,
  },
  {
    title: "Giá",
    dataIndex: "price",
    renderItem: (value) => formatPrice(value),
  },
  {
    title: "Hành động",
    renderItem: (value) => (
      <div>
        <FiEdit color="blue" className="cursor-pointer" size={20} />
        <RiDeleteBin4Line color="red" className="cursor-pointer" size={20} />
      </div>
    ),
  },
];

const Page = () => {
  const [page, setPage] = React.useState(1);
  const {
    data: products,
    isFetching,
    totalElements,
  } = useFetch<Product>({
    page: page,
    endpoint: apiEndpoints.PRODUCTS,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC],
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <div className="mb-2">
        <Link className="text-sm" href="/admin/products/create">
          + Tạo mới
        </Link>
      </div>
      <Table columns={columns} data={products} loading={isFetching} />
      <Pagination totalItems={totalElements} onChange={onPageChange} />
    </div>
  );
};

export default Page;
