"use client";

import { useBrands } from "@/hooks/react-query/brands/useBrands";
import { useCategories } from "@/hooks/react-query/categories/useCategories";
import { useUrlParams } from "@/hooks/useUrlParams";
import { formatPrice } from "@/utils/formatPrice";
import { debounce } from "lodash";
import Slider from "rc-slider";
import React, { useState } from "react";
import FilterCategoryItem from "./FilterCategoryItem";

export default function FilterAll() {
  const { getAllParams, getParam } = useUrlParams();
  const activeCategory = Number(getParam("activeCategory")) || undefined;
  const minPrice = Number(getParam("minPrice")) || 0;
  const maxPrice = Number(getParam("maxPrice")) || 0;
  const activeBrands = getAllParams("brands");
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { setParams, removeParams, toggleArrayParam } = useUrlParams();

  const filterFacts = React.useMemo(() => {
    const result = [];
    if (activeCategory && categories) {
      for (let i = 0; i < categories?.length; i++) {
        const item = categories[i];
        if (item.id === activeCategory) {
          result?.push({
            id: item?.id,
            label: item?.name,
            key: "activeCategory",
          });
          break;
        } else {
          const temp = item?.subCategories?.find(
            (subItem) => subItem?.id === activeCategory
          );
          if (temp) {
            result?.push({
              id: temp?.id,
              label: temp?.name,
              key: "activeCategory",
            });
            break;
          }
        }
      }
    }

    if (Array.isArray(activeBrands)) {
      activeBrands.forEach((id) => {
        const temp = brands?.find((_item) => `${_item.id}` === id);
        result?.push({ id: temp?.id, label: temp?.name, key: "brands" });
      });
    }

    return result;
  }, [activeCategory, activeBrands, brands, categories]);

  const handleOnChange = (value: any) => {
    setPrice(value);
    debouncedHandleOnChange(value);
  };

  const debouncedHandleOnChange = React.useCallback(
    debounce((value) => {
      setParams([
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
              Dòng sản phẩm chính
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
              <ul className="list list-inline mb-0">
                {categories?.map((category, index) => (
                  <FilterCategoryItem
                    isActive={category?.id === activeCategory}
                    category={category}
                    key={index}
                  />
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
                {brands
                  ?.filter((item) =>
                    item?.name
                      ?.toLocaleLowerCase()
                      ?.includes(searchQuery?.toLocaleLowerCase())
                  )
                  .map((elm, i) => (
                    <li
                      key={i}
                      onClick={() => {
                        toggleArrayParam("brands", `${elm?.id}`, {
                          shouldReset: true,
                        });
                      }}
                      className={`search-suggestion__item multi-select__item text-primary js-search-select js-multi-select ${
                        activeBrands?.includes(`${elm?.id}`)
                          ? "mult-select__item_selected"
                          : ""
                      }`}
                    >
                      <span className="me-auto">{elm.name}</span>
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
              max={100000000}
              min={0}
              defaultValue={price}
              onChange={(value) => handleOnChange(value)}
            />
            <div className="price-range__info d-flex align-items-center mt-2">
              <div className="me-auto">
                <span className="text-secondary">Từ: </span>
                <span className="price-range__min">
                  {formatPrice(price[0])}
                </span>
              </div>
              <div>
                <span className="text-secondary">Đến: </span>
                <span className="price-range__max">
                  {formatPrice(price[1])}
                </span>
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
            onClick={() =>
              removeParams([{ key: filter?.key, value: `${filter?.id}` }])
            }
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
