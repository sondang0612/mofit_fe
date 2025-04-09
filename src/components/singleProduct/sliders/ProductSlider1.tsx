"use client";

import React, { useEffect, useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/thumbs";
import "swiper/css";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import tippy from "tippy.js";
import { Product } from "@/types/api";
import { EDefaultValue } from "@/utils/constants/default-value.enum";

interface Props {
  product?: Product;
}

export default function ProductSlider1(props: Props) {
  const { product } = props;
  useEffect(() => {
    tippy("[data-tippy-content]");
  }, []);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const images = React.useMemo(() => {
    return [
      product?.imgSrc || EDefaultValue.IMAGE,
      product?.imgSrc2 || EDefaultValue.IMAGE,
    ]?.filter(Boolean);
  }, [product?.imgSrc, product?.imgSrc2]);

  return (
    <div className="product-single__media vertical-thumbnail product-media-initialized">
      <div className="product-single__image position-relative">
        <Gallery>
          <Swiper
            modules={[Thumbs, Navigation]}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper }}
            navigation={{ prevEl: ".ssnbp1", nextEl: ".ssnbn1" }}
            className="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
          >
            {images.filter(Boolean).map((elm, i) => (
              <SwiperSlide
                style={{
                  maxWidth: "100%",
                  overflow: "hidden",
                  position: "relative",
                }}
                key={i}
                className="swiper-slide product-single__image-item"
              >
                <Item original={elm} thumbnail={elm} width="674" height="674">
                  {({ ref, open }) => (
                    <>
                      <Image
                        loading="lazy"
                        className="h-auto w-100"
                        src={elm as any}
                        width="674"
                        height="674"
                        alt="image"
                      />
                      <a
                        ref={ref}
                        onClick={open}
                        data-fancybox="gallery"
                        // href="/assets/images/products/product_0.jpg"
                        className="item-zoom"
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        data-tippy-content="Zoom"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon_zoom" />
                        </svg>
                      </a>
                    </>
                  )}
                </Item>
              </SwiperSlide>
            ))}

            <div className="cursor-pointer swiper-button-prev ssnbp1">
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_prev_sm" />
              </svg>
            </div>
            <div className="cursor-pointer swiper-button-next ssnbn1">
              <svg
                width="7"
                height="11"
                viewBox="0 0 7 11"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_next_sm" />
              </svg>
            </div>
          </Swiper>
        </Gallery>
      </div>
      <div className="product-single__thumbnail">
        <Swiper
          modules={[Thumbs]}
          breakpoints={{
            0: {
              direction: "horizontal",
              slidesPerView: 4,
            },
            992: {
              direction: "vertical",
            },
          }}
          className="swiper-container swiper-container-initialized swiper-container-pointer-events swiper-container-free-mode swiper-container-thumbs swiper-container-horizontal"
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
        >
          {images.map((elm, i) => (
            <SwiperSlide
              key={i}
              className="swiper-slide product-single__image-item"
              style={{ marginBottom: "10px" }}
            >
              <Image
                loading="lazy"
                className="h-auto"
                src={elm as any}
                width="104"
                height="104"
                alt="image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
