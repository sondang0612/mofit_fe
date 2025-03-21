"use client";
import { sortingOptions } from "@/data/products/productCategories";
import {
  QueryParam,
  QueryValue,
  useInfiniteFetch,
} from "@/hooks/react-query/useInfiniteFetch";
import { Product as IProduct } from "@/types/api";
import { openModalShopFilter } from "@/utils/aside";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination1 from "../common/Pagination1";
import List from "../homes/home-1/List";
import SkeletonProduct1 from "../homes/home-1/SkeletonProduct1";
import BreadCumb from "./BreadCumb";
import Product from "./Product";

const Shop1 = () => {
  const searchParams = useSearchParams();
  const sortingValue = searchParams.get("sortingValue");
  const activeCategory = searchParams.get("activeCategory");
  const brands = searchParams.getAll("brands");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const router = useRouter();
  const {
    data: products,
    isFetching,
    totalElements,
    fetchNextPage,
  } = useInfiniteFetch<IProduct>({
    endpoint: apiEndpoints.PRODUCTS,
    limit: 12,
    queryParams: [
      QueryParam.SORT_BY,
      QueryParam.SORT,
      QueryParam.ATTRIBUTE_VALUE,
      QueryParam.CATEGORY,
      QueryParam.BRANDS,
      QueryParam.MIN_PRICE,
      QueryParam.MAX_PRICE,
    ],
    queryValues: [
      QueryValue.CREATED_AT,
      QueryValue.DESC,
      sortingValue === "all" ? undefined : sortingValue,
      activeCategory,
      brands,
      minPrice,
      maxPrice,
    ],
  });

  const renderItem = React.useCallback(({ data }: { data: IProduct }) => {
    return <Product data={data} />;
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortingValue", selectedValue);

      router.push(`?${params?.toString()}`, { scroll: false });
    }
  };

  return (
    <>
      <div className="mb-4 pb-lg-3"></div>
      <section className="shop-main container">
        <div className="d-flex justify-content-between mb-4 pb-md-2">
          <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
            <BreadCumb />
          </div>

          <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
            <select
              className="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
              aria-label="Sort Items"
              name="total-number"
              value={sortingValue || "all"}
              onChange={handleChange}
            >
              {sortingOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="shop-asc__seprator mx-3 bg-light d-none d-md-block order-md-0"></div>
            {/* <!-- /.col-size --> */}

            <div className="shop-asc__seprator mx-3 bg-light d-none d-lg-block order-md-1"></div>

            <div className="shop-filter d-flex align-items-center order-0 order-md-3">
              <button
                className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
                onClick={openModalShopFilter}
              >
                <svg
                  className="d-inline-block align-middle me-2"
                  width="14"
                  height="10"
                  viewBox="0 0 14 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon_filter" />
                </svg>
                <span className="text-uppercase fw-medium d-inline-block align-middle">
                  Bộ lọc
                </span>
              </button>
            </div>
            {/* <!-- /.col-size d-flex align-items-center ms-auto ms-md-3 --> */}
          </div>
          {/* <!-- /.shop-acs --> */}
        </div>
        {/* <!-- /.d-flex justify-content-between --> */}

        <div
          className={`products-grid row row-cols-2 row-cols-md-3 row-cols-lg-6`}
          id="products-grid"
        >
          <List
            data={products}
            isFetching={isFetching}
            renderItem={renderItem}
            n={12}
            skeleton={SkeletonProduct1}
          />
        </div>
        {/* <!-- /.products-grid row --> */}

        <p className="mb-5 text-center fw-medium">
          Tổng {products?.length} / {totalElements} sản phẩm
        </p>
        <Pagination1
          currentItems={products?.length}
          totalItems={totalElements}
        />

        <div className="text-center">
          <button
            className="btn-link btn-link_lg text-uppercase fw-medium"
            onClick={() => fetchNextPage()}
          >
            Xem thêm
          </button>
        </div>
      </section>
    </>
  );
};

export default Shop1;
