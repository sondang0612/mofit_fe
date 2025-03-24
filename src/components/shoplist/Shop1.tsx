"use client";
import { sortingOptions } from "@/data/products/productCategories";
import { useFetch } from "@/hooks/react-query/useFetch";
import { QueryParam, QueryValue } from "@/hooks/react-query/useInfiniteFetch";
import { Product as IProduct } from "@/types/api";
import { openModalShopFilter } from "@/utils/aside";
import { ITEMS_PER_PAGE } from "@/utils/constants";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import List from "../homes/home-1/List";
import SkeletonProduct1 from "../homes/home-1/SkeletonProduct1";
import BreadCumb from "./BreadCumb";
import FilterAll from "./filter/FilterAll";
import Pagination from "./Pagination";
import Product from "./Product";
import { useUrlParams } from "@/hooks/useUrlParams";

const Shop1 = () => {
  const {
    getParam,
    getAllParams,
    setParams,
    params: searchParams,
  } = useUrlParams();
  const sortingValue = getParam("sortingValue");
  const activeCategory = getParam("activeCategory");
  const brands = getAllParams("brands");
  const minPrice = getParam("minPrice");
  const maxPrice = getParam("maxPrice");
  const currentPage = Number(getParam("page") || 1);

  const router = useRouter();
  const {
    data: products,
    isFetching,
    totalElements,
  } = useFetch<IProduct>({
    page: currentPage,
    endpoint: apiEndpoints.PRODUCTS,
    limit: ITEMS_PER_PAGE,
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

  const onPageChange = (page: number) => {
    setParams([{ key: "page", value: page }]);
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <div className="mb-4 pb-lg-3"></div>
      <section className="shop-main container d-flex">
        <div className="shop-sidebar side-sticky bg-body">
          <div
            onClick={openModalShopFilter}
            className="aside-header d-flex d-lg-none align-items-center"
          >
            <h3 className="text-uppercase fs-6 mb-0">Filter By</h3>
            <button className="btn-close-lg js-close-aside btn-close-aside ms-auto"></button>
          </div>

          <div className="pt-4 pt-lg-0"></div>

          <FilterAll />
        </div>

        <div className="shop-list flex-grow-1">
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

              <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
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
            </div>
          </div>

          <div
            className={`products-grid row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-5`}
            id="products-grid"
          >
            <List
              data={products}
              isFetching={isFetching}
              renderItem={renderItem}
              skeleton={SkeletonProduct1}
            />
          </div>
          <Pagination totalItems={totalElements} onChange={onPageChange} />
        </div>
      </section>
    </>
  );
};

export default Shop1;
