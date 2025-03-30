"use client";

import React from "react";
import Order from "./order/Order";
import { useMyOrder } from "@/hooks/react-query/orders/useMyOrders";

const LIMIT = 5;

export default function AccountOrders() {
  const [page, setPage] = React.useState(1);
  const { data: orders } = useMyOrder({ page, limit: LIMIT });

  const totalPages = React.useMemo(() => {
    if (!orders?.total) return 0;

    return Math.ceil(orders?.total / LIMIT);
  }, [orders?.total, LIMIT]);

  const next = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__orders-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Tổng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((item) => (
              <Order data={item} key={item?.id} />
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          <button className="btn btn-primary" onClick={prev}>
            ← Previous
          </button>
          <span className="mx-3">Page {page}</span>
          <button className="btn btn-primary" onClick={next}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
