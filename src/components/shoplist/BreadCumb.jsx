import Link from "next/link";
import React from "react";

export default function BreadCumb() {
  return (
    <>
      <Link
        href="/"
        className="menu-link menu-link_us-s text-uppercase fw-medium"
      >
        Trang chủ
      </Link>
      <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
        /
      </span>
      <Link
        href="/shop-1"
        className="menu-link menu-link_us-s text-uppercase fw-medium"
      >
        Cửa hàng
      </Link>
    </>
  );
}
