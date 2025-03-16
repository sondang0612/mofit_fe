"use client";

import { useBrands } from "@/hooks/react-query/brands/useBrands";
import { useCategories } from "@/hooks/react-query/categories/useCategories";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "rc-slider";
import React, { useState } from "react";
import { debounce } from "lodash";

export default function FilterAll() {
  const searchParams = useSearchParams();
  const activeCategory =
    Number(searchParams.get("activeCategory")) || undefined;
  const activeBrands = searchParams.getAll("brands");
  const router = useRouter();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const [price, setPrice] = useState([20, 70987]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filterFacts = React.useMemo(() => {
    const result = [];
    if (activeCategory) {
      const temp = categories?.data?.find((item) => item.id === activeCategory);
      result?.push({
        id: temp?.id,
        label: temp?.name,
        key: "activeCategory",
      });
    }

    if (Array.isArray(activeBrands)) {
      activeBrands.forEach((id) => {
        const temp = brands?.data?.find((_item) => `${_item.id}` === id);
        result?.push({ id: temp?.id, label: temp?.name, key: "brands" });
      });
    }

    return result;
  }, [activeCategory, activeBrands, brands, categories]);

  // price range handler
  const handleOnChange = (value: any) => {
    setPrice(value);
    debouncedHandleOnChange(value);
  };

  const handleSetParams = (data: { key: string; value: string }[]) => {
    const params = new URLSearchParams(searchParams.toString());

    data.forEach((item) => params.set(item.key, item.value));

    router.push(`?${params?.toString()}`, { scroll: false });
  };

  const handleSetArrayToParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    let values = params.getAll(key);

    if (values.includes(value)) {
      values = values.filter((v) => v !== value);
    } else {
      values.push(value);
    }

    params.delete(key);
    values.forEach((v) => params.append(key, v));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleDeleteParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key, value);

    router.push(`?${params?.toString()}`, { scroll: false });
  };

  const debouncedHandleOnChange = React.useCallback(
    debounce((value) => {
      handleSetParams([
        { key: "minPrice", value: value[0] },
        { key: "maxPrice", value: value[1] },
      ]);
    }, 500),
    []
  );

  return (
    <>
      <div className="accordion" id="categories-list">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header" id="accordion-heading-11">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-1"
              aria-expanded="true"
              aria-controls="accordion-filter-1"
            >
              Loại sản phẩm
              <svg className="accordion-button__icon" viewBox="0 0 14 14">
                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                  <path
                    className="svg-path-vertical"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                  <path
                    className="svg-path-horizontal"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                </g>
              </svg>
            </button>
          </h5>
          <div
            id="accordion-filter-1"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-11"
            data-bs-parent="#categories-list"
          >
            <div className="accordion-body px-0 pb-0">
              <ul className="list list-inline row row-cols-2 mb-0">
                {categories?.data.map((category, index) => (
                  <li
                    key={index}
                    className={`list-item py-1 cursor-pointer ${
                      activeCategory === category?.id && "text-blue-500"
                    }`}
                    onClick={() =>
                      handleSetParams([
                        { key: "activeCategory", value: `${category.id}` },
                      ])
                    }
                  >
                    {category?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* /.accordion-item */}
      </div>
      {/* /.accordion */}
      <div className="accordion" id="brand-filters">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header" id="accordion-heading-brand">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-brand"
              aria-expanded="true"
              aria-controls="accordion-filter-brand"
            >
              Thương hiệu
              <svg className="accordion-button__icon" viewBox="0 0 14 14">
                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                  <path
                    className="svg-path-vertical"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                  <path
                    className="svg-path-horizontal"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                </g>
              </svg>
            </button>
          </h5>
          <div
            id="accordion-filter-brand"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-brand"
            data-bs-parent="#brand-filters"
          >
            <div className="search-field multi-select accordion-body px-0 pb-0">
              <div className="search-field__input-wrapper mb-3">
                <input
                  type="text"
                  name="search_text"
                  className="search-field__input form-control form-control-sm border-light border-2"
                  placeholder="Tìm kiếm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ul className="multi-select__list list-unstyled">
                {brands?.data
                  ?.filter((item) =>
                    item?.name
                      ?.toLocaleLowerCase()
                      ?.includes(searchQuery?.toLocaleLowerCase())
                  )
                  .map((elm, i) => (
                    <li
                      key={i}
                      onClick={() =>
                        handleSetArrayToParams("brands", `${elm?.id}`)
                      }
                      className={`search-suggestion__item multi-select__item text-primary js-search-select js-multi-select ${
                        activeBrands?.includes(`${elm?.id}`)
                          ? "mult-select__item_selected"
                          : ""
                      }`}
                    >
                      <span className="me-auto">{elm.name}</span>
                      <span className="text-secondary">
                        {elm?.totalProducts}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        {/* /.accordion-item */}
      </div>
      {/* /.accordion */}
      <div className="accordion" id="price-filters">
        <div className="accordion-item mb-4">
          <h5 className="accordion-header mb-2" id="accordion-heading-price">
            <button
              className="accordion-button p-0 border-0 fs-5 text-uppercase"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#accordion-filter-price"
              aria-expanded="true"
              aria-controls="accordion-filter-price"
            >
              Giá
              <svg className="accordion-button__icon" viewBox="0 0 14 14">
                <g aria-hidden="true" stroke="none" fillRule="evenodd">
                  <path
                    className="svg-path-vertical"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                  <path
                    className="svg-path-horizontal"
                    d="M14,6 L14,8 L0,8 L0,6 L14,6"
                  />
                </g>
              </svg>
            </button>
          </h5>
          <div
            id="accordion-filter-price"
            className="accordion-collapse collapse show border-0"
            aria-labelledby="accordion-heading-price"
            data-bs-parent="#price-filters"
          >
            <Slider
              range
              max={100000}
              min={0}
              defaultValue={price}
              onChange={(value) => handleOnChange(value)}
            />
            <div className="price-range__info d-flex align-items-center mt-2">
              <div className="me-auto">
                <span className="text-secondary">Min Price: </span>
                <span className="price-range__min">${price[0]}</span>
              </div>
              <div>
                <span className="text-secondary">Max Price: </span>
                <span className="price-range__max">${price[1]}</span>
              </div>
            </div>
          </div>
        </div>
        {/* /.accordion-item */}
      </div>
      {/* /.accordion */}
      <div className="filter-active-tags pt-2">
        {filterFacts.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleDeleteParams(filter?.key, `${filter?.id}`)}
            className="filter-tag d-inline-flex align-items-center mb-3 me-3 text-uppercase js-filter"
          >
            <i className="btn-close-xs d-inline-block" />
            <span className="ms-2">{filter.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
