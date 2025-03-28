"use client";
import Avatar from "@/components/headers/components/Avatar";
import Role from "@/components/Role";
import Pagination from "@/components/shoplist/Pagination";
import Table, { Column } from "@/components/Table";
import { QueryParam, QueryValue, useFetch } from "@/hooks/react-query/useFetch";
import { User } from "@/types/api";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import React from "react";

const employeeColumns: Column<User>[] = [
  {
    title: "Tên",
    dataIndex: "username",
    renderItem: (_, data) => {
      return (
        <div className="d-flex align-items-center">
          <Avatar data={data} size={32} />
          <div className="ms-2">
            <div className="fw-bold">{data?.username}</div>
            <div className="text-muted small">ID: {data?.id}</div>
          </div>
        </div>
      );
    },
  },
  { title: "Email", dataIndex: "email" },
  {
    title: "Vai trò",
    dataIndex: "role",
    renderItem: (value) => <Role role={value} />,
  },
  {
    title: "Số điện thoại",
    dataIndex: "phoneNumber",
  },
];

const Page = () => {
  const [page, setPage] = React.useState(1);
  const {
    data: users,
    isFetching,
    totalElements,
  } = useFetch<User>({
    page,
    endpoint: apiEndpoints.USERS,
    limit: ITEMS_PER_PAGE,
    queryParams: [QueryParam.SORT_BY, QueryParam.SORT],
    queryValues: [QueryValue.CREATED_AT, QueryValue.DESC],
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div>
      <Table columns={employeeColumns} data={users} loading={isFetching} />
      <Pagination totalItems={totalElements} onChange={onPageChange} />
    </div>
  );
};

export default Page;
