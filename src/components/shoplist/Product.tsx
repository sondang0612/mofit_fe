"use client";

import { useCreateCartItem } from "@/hooks/react-query/cart-items/useCreateCartItem";
import { Product as IProduct } from "@/types/api";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { getFinalPrice } from "@/utils/getFinalPrice";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
interface Props {
  data: IProduct;
}

const Product = (props: Props) => {
  const { data } = props;
  const { mutate: createCartItem } = useCreateCartItem();

  const handleAddToCart = (productId?: number, quantity?: number) => {
    if (!productId || !quantity) {
      return undefined;
    }

    createCartItem({ productId, quantity });
  };

  return (
    <div className="product-card-wrapper">
      <div className="product-card mb-3 mb-md-4 mb-xxl-5">
        <div className="pc__img-wrapper">
          <Swiper
            className="swiper swiper-container swiper-initialized swiper-horizontal swiper-backface-hidden background-img js-swiper-slider"
            slidesPerView={1}
            modules={[Navigation]}
            navigation={{
              prevEl: ".prev" + data?.id,
              nextEl: ".next" + data?.id,
            }}
          >
            {[data?.imgSrc, data?.imgSrc2].map((elm2, i) => (
              <SwiperSlide key={i} className="swiper-slide w-inherit">
                <Link href={`/product1_simple/${data?.id}`}>
                  <Image
                    loading="lazy"
                    src={elm2 || EDefaultValue.IMAGE}
                    width="330"
                    height="400"
                    alt="product image"
                    className="pc__img"
                  />
                </Link>
              </SwiperSlide>
            ))}

            <span
              className={`cursor-pointer pc__img-prev ${"prev" + data?.id} `}
            >
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_prev_sm" />
              </svg>
            </span>
            <span
              className={`cursor-pointer pc__img-next ${"next" + data?.id} `}
            >
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_next_sm" />
              </svg>
            </span>
          </Swiper>
          <button
            className="pc__atc btn anim_appear-bottom btn position-absolute border-0 fw-medium js-add-cart js-open-aside"
            onClick={() => handleAddToCart(data?.id, 1)}
          >
            Thêm vào giỏ hàng
          </button>
        </div>

        <div className="pc__info position-relative">
          {/* <p className="pc__category">{data?.category?.name}</p> */}
          <h6 className="pc__title">
            <Link href={`/product1_simple/${data?.id}`}>{data?.title}</Link>
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
          <button className="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 js-add-wishlist">
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
        {data?.discount && (
          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
            <div className="pc-labels__right ms-auto">
              <span className="pc-label pc-label_sale d-block text-white">
                -{data?.discount?.percentage}%
              </span>
            </div>
          </div>
        )}
        {/* {elm.isNew && (
          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
            <div className="pc-labels__left">
              <span className="pc-label pc-label_new d-block bg-white">
                NEW
              </span>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Product;
