"use client";
import Star from "@/components/common/Star";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
const filterCategories = ["All", "New Arrivals", "Best Seller", "Top Rated"];

import { useInfiniteFetch } from "@/hooks/react-query/useInfiniteFetch";
import { Product } from "@/types/api";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import Image from "next/image";
import { useState } from "react";
import SkeletonProduct1 from "./SkeletonProduct1";
import { useAddToCart } from "@/hooks/react-query/cart/useAddToCart";

export default function Products2() {
  const { toggleWishlist, isAddedtoWishlist } = useContextElement();
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const [currentCategory, setCurrentCategory] = useState(filterCategories[0]);
  const { mutate: addToCart } = useAddToCart();
  const { data: products } = useInfiniteFetch<Product>({
    endpoint: apiEndpoints.PRODUCTS,
    limit: 8,
    attributeName: currentCategory === "All" ? undefined : currentCategory,
  });

  const handleAddToCart = (productId?: number, quantity?: number) => {
    if (!productId || !quantity) {
      return undefined;
    }

    addToCart({ productId, quantity });
  };

  return (
    <section className="products-grid container">
      <h2 className="section-title text-uppercase text-center mb-1 mb-md-3 pb-xl-2 mb-xl-4">
        Our Trendy <strong>Products</strong>
      </h2>
      <ul className="nav nav-tabs mb-3 text-uppercase justify-content-center">
        {filterCategories.map((elm, i) => (
          <li
            onClick={() => setCurrentCategory(elm)}
            key={i}
            className="nav-item"
            role="presentation"
          >
            <a
              className={`nav-link nav-link_underscore ${
                currentCategory == elm ? "active" : ""
              }`}
            >
              {elm}
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
            {!products
              ? [0, 1, 2, 3].map((item) => <SkeletonProduct1 key={item} />)
              : products?.map((elm, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3">
                    <div className="product-card mb-3 mb-md-4 mb-xxl-5">
                      <div className="pc__img-wrapper">
                        <Link href={`/product1_simple/${elm?.id}`}>
                          <Image
                            loading="lazy"
                            src={elm?.imgSrc || EDefaultValue.IMAGE}
                            width="330"
                            height="400"
                            alt={elm?.title || EDefaultValue.ALT_IMAGE}
                            className="pc__img"
                          />
                          <Image
                            loading="lazy"
                            src={elm?.imgSrc2 || EDefaultValue.IMAGE}
                            width="330"
                            height="400"
                            className="pc__img pc__img-second"
                            alt="image"
                          />
                        </Link>
                        <button
                          className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium js-add-cart js-open-aside"
                          onClick={() => handleAddToCart(elm?.id, 1)}
                          title={"Thêm vào giỏ hàng"}
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </div>

                      <div className="pc__info position-relative">
                        <p className="pc__category">{elm?.category?.name}</p>
                        <h6 className="pc__title">
                          <Link href={`/product1_simple/${elm.id}`}>
                            {elm.title}
                          </Link>
                        </h6>
                        <div className="product-card__price d-flex">
                          <span className="money price">${elm.price}</span>
                        </div>
                        <div className="product-card__review d-flex align-items-center">
                          <div className="reviews-group d-flex">
                            <Star stars={elm?.ratings} />
                          </div>
                          <span className="reviews-note text-lowercase text-secondary ms-1">
                            {elm?.totalReviews}
                          </span>
                        </div>

                        <button
                          className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist ${
                            isAddedtoWishlist(elm.id) ? "active" : ""
                          }`}
                          title="Add To Wishlist"
                          onClick={() => toggleWishlist(elm.id)}
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
                ))}
          </div>
          {/* <!-- /.row --> */}
          <div className="text-center mt-2">
            <Link
              className="btn-link btn-link_lg default-underline text-uppercase fw-medium"
              href="/shop-1"
            >
              Discover More
            </Link>
          </div>
        </div>

        {/* <!-- /.tab-pane fade show--> */}
      </div>
      {/* <!-- /.tab-content pt-2 --> */}
    </section>
  );
}
