"use client";

import { useCreateCartItem } from "@/hooks/react-query/cart-items/useCreateCartItem";
import { Product as IProduct } from "@/types/api";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { formatPrice } from "@/utils/formatPrice";
import { getFinalPrice } from "@/utils/getFinalPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

  const price = React.useMemo(() => {
    return formatPrice(data?.price);
  }, [data?.price]);

  const discountedPrice = React.useMemo(() => {
    return formatPrice(getFinalPrice(data?.price, data?.discount));
  }, [data?.price, data?.discount]);

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
        </div>

        <div className="pc__info position-relative">
          {/* <p className="pc__category">{data?.category?.name}</p> */}
          <h6
            className="pc__title line-clamp-2"
            style={{
              fontSize: 14,
              fontWeight: 700,
              minHeight: 34,
              overflow: "hidden",
            }}
          >
            <Link href={`/product1_simple/${data?.id}`}>{data?.title}</Link>
          </h6>
          <div className="product-card__price">
            <div
              className={`money price ${
                data?.discount ? "price-old" : "visibility-hidden"
              }`}
            >
              {price}
            </div>
            <div className="money price price-sale">{discountedPrice}</div>
          </div>
          <button
            className="pc__btn-wl position-absolute  end-0 bg-transparent border-0"
            style={{ bottom: 5 }}
            onClick={() => handleAddToCart(data?.id, 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
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
