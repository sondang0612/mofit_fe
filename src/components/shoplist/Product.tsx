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
import { AiFillPlusSquare } from "react-icons/ai";

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
                <Link href={`/${data?.slug}/product`}>
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

        <div className="pc__info position-relative bg-white">
          <p className="pc__category">
            {data?.category?.parentCategory
              ? data?.category?.parentCategory.name
              : data?.category?.name}
          </p>
          <h6
            className="pc__title line-clamp-2"
            style={{
              fontSize: 14,
              fontWeight: 500,
              minHeight: 34,
              overflow: "hidden",
            }}
          >
            <Link href={`/${data?.slug}/product`}>{data?.title}</Link>
          </h6>
          <div className="product-card__price">
            <div
              className={`money price ${
                data?.discount ? "price-old" : "visibility-hidden"
              }`}
            >
              {price}
            </div>
            <div
              className="money price price-sale"
              style={{ color: "#222222" }}
            >
              {discountedPrice}
            </div>
          </div>
          <button
            className="pc__btn-wl position-absolute  end-0 bg-transparent border-0"
            style={{ bottom: 12, right: 12 }}
            onClick={() => handleAddToCart(data?.id, 1)}
          >
            <AiFillPlusSquare size={24} color="black" />
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
