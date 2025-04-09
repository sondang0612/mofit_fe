"use client";
import Star from "@/components/common/Star";
import { useContextElement } from "@/context/Context";
import Link from "next/link";

import { attributesData } from "@/data/products/productCategories";
import { useCreateCartItem } from "@/hooks/react-query/cart-items/useCreateCartItem";
import {
  QueryParam,
  QueryValue,
  useInfiniteFetch,
} from "@/hooks/react-query/useInfiniteFetch";
import { Product } from "@/types/api";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { getFinalPrice } from "@/utils/getFinalPrice";
import List from "./List";
import SkeletonProduct1 from "./SkeletonProduct1";
import { pathNames } from "@/utils/constants/paths";

export default function Products2() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const [selectedAttributeValue, setSelectedAttributeValue] = useState(
    attributesData[0].value
  );
  const { mutate: createCartItem } = useCreateCartItem();
  const { data: products, isFetching } = useInfiniteFetch<Product>({
    endpoint: apiEndpoints.PRODUCTS,
    limit: 4,
    queryParams: [
      QueryParam.SORT_BY,
      QueryParam.SORT,
      QueryParam.ATTRIBUTE_VALUE,
    ],
    queryValues: [
      QueryValue.CREATED_AT,
      QueryValue.DESC,
      selectedAttributeValue === "all" ? undefined : selectedAttributeValue,
    ],
  });

  const handleAddToCart = (productId?: number, quantity?: number) => {
    if (!productId || !quantity) {
      return undefined;
    }

    createCartItem({ productId, quantity });
  };

  const renderItem = React.useCallback(({ data }: { data: Product }) => {
    return (
      <div className="col-6 col-md-4 col-lg-3">
        <div className="product-card mb-3 mb-md-4 mb-xxl-5">
          <div className="pc__img-wrapper">
            <Link href={`/${data?.slug}/product`}>
              <Image
                loading="lazy"
                src={data?.imgSrc || EDefaultValue.IMAGE}
                width="330"
                height="400"
                alt={data?.title || EDefaultValue.ALT_IMAGE}
                className="pc__img"
              />
              <Image
                loading="lazy"
                src={data?.imgSrc2 || EDefaultValue.IMAGE}
                width="330"
                height="400"
                className="pc__img pc__img-second"
                alt="image"
              />
              {data?.discount && (
                <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
                  <div className="pc-labels__right ms-auto">
                    <span className="pc-label pc-label_sale d-block text-white">
                      -{data?.discount?.percentage}%
                    </span>
                  </div>
                </div>
              )}
            </Link>
            <button
              className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
              onClick={() => handleAddToCart(data?.id, 1)}
              title={"Thêm vào giỏ hàng"}
            >
              Thêm vào giỏ hàng
            </button>
          </div>

          <div className="pc__info position-relative">
            {/* <p className="pc__category">{data?.category?.name}</p> */}
            <h6 className="pc__title">
              <Link href={`/${data.id}`}>{data.title}</Link>
            </h6>
            <div className="product-card__price d-flex">
              {data?.discount ? (
                <Fragment>
                  <span className="money price price-old">${data?.price}</span>
                  <span className="money price price-sale">
                    ${getFinalPrice(data?.price, data?.discount)}
                  </span>
                </Fragment>
              ) : (
                <span className="money price">${data?.price}</span>
              )}
            </div>
            <button
              className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                isAddedtoWishlist(data.id) ? "active" : ""
              }`}
              title="Add To Wishlist"
              onClick={() => toggleWishlist(data.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_heart" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <section className="products-grid container">
      <h2 className="section-title text-center mb-1 mb-md-3 pb-xl-2 mb-xl-4">
        Our Trendy Products
      </h2>
      <ul className="nav nav-tabs mb-3 text-uppercase justify-content-center">
        {attributesData.map((elm, i) => (
          <li
            onClick={() => setSelectedAttributeValue(elm.value)}
            key={i}
            className="nav-item"
            role="presentation"
          >
            <a
              className={`nav-link nav-link_underscore ${
                selectedAttributeValue == elm.value ? "active" : ""
              }`}
            >
              {elm.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content pt-2" id="collections-tab-content">
        <div
          className="tab-pane fade show active"
          id="collections-tab-1"
          role="tabpanel"
          aria-labelledby="collections-tab-1-trigger"
        >
          <div className="row">
            <List
              data={products}
              isFetching={isFetching}
              renderItem={renderItem}
              n={4}
              skeleton={SkeletonProduct1}
            />
          </div>
          {/* <!-- /.row --> */}
          <div className="text-center mt-2">
            <Link
              className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
              href={`${pathNames.STORE}?sortingValue=${selectedAttributeValue}`}
            >
              Xem thêm
            </Link>
          </div>
        </div>

        {/* <!-- /.tab-pane fade show--> */}
      </div>
      {/* <!-- /.tab-content pt-2 --> */}
    </section>
  );
}
