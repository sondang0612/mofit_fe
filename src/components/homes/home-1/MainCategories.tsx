"use client";
import { useCategories } from "@/hooks/react-query/categories/useCategories";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { pathNames } from "@/utils/constants/paths";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Pagination, Navigation, Autoplay],
  autoplay: {
    delay: 5000,
  },
  slidesPerView: 4,
  slidesPerGroup: 4,
  effect: "none",
  loop: true,
  pagination: {
    el: "#product_carousel .products-pagination",
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: "#product_carousel .products-carousel__next",
    prevEl: "#product_carousel .products-carousel__prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 24,
    },
  },
};
const MainCategories = () => {
  const { data: categories } = useCategories();
  const router = useRouter();

  return (
    <div className="products-carousel mx-4">
      <h2 className="section-title mb-4 pb-xl-2 mb-xl-2">
        Dòng sản phẩm chính
      </h2>

      <div id="product_carousel" className="position-relative">
        <Swiper
          style={{ maxWidth: "100vw", overflow: "hidden" }}
          {...(swiperOptions as any)}
          className="swiper-container js-swiper-slider"
        >
          {categories?.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide product-card">
              <div className="pc__img-wrapper">
                <Link href={`${pathNames.STORE}?activeCategory=${elm.id}`}>
                  <Image
                    loading="lazy"
                    src={elm.imgSrc || EDefaultValue.IMAGE}
                    width="348"
                    height="348"
                    alt="Cropped Faux leather Jacket"
                    className="pc__img"
                  />
                </Link>
              </div>

              <div className="pc__info position-relative">
                <h6 className="pc__title font-medium">
                  <Link href={`${pathNames.STORE}?activeCategory=${elm.id}`}>
                    {elm?.name}
                  </Link>
                </h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="products-pagination mt-4 mb-4 d-flex align-items-center justify-content-center"></div>
        <div className="d-flex align-items-center justify-content-center w-full">
          <button
            className="rounded-10 px-3 py-1"
            onClick={() => router.push(pathNames.STORE)}
          >
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
