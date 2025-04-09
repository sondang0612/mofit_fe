"use client";
import { useCategories } from "@/hooks/react-query/categories/useCategories";
import { pathNames } from "@/utils/constants/paths";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type Form = {
  searchQuery: string;
};

const defaultValues = {
  searchQuery: "",
};

export default function SearchPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { register, handleSubmit } = useForm<Form>({ defaultValues });
  const containerRef = useRef<any>(null);
  const { data: categories } = useCategories();
  const router = useRouter();
  const handleClickOutside = (event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  const onSubmit = (data: Form) => {
    setIsPopupOpen(false);
    router.push(`${pathNames.STORE}?searchQuery=${data?.searchQuery}`);
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`header-tools__item hover-container ${
        isPopupOpen ? "js-content_visible" : ""
      }`}
    >
      <div className="js-hover__open position-relative">
        <a
          onClick={() => setIsPopupOpen((pre) => !pre)}
          className="js-search-popup search-field__actor"
          href="#"
        >
          <svg
            className="d-block"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_search" />
          </svg>
          <i className="btn-icon btn-close-lg"></i>
        </a>
      </div>

      <div className="search-popup js-hidden-content">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="search-field container"
        >
          <p className="text-uppercase text-secondary fw-medium mb-4">
            Bạn đang trông đợi điều gì?
          </p>
          <div className="position-relative">
            <input
              className="search-field__input search-popup__input w-100 fw-medium"
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              {...register("searchQuery")}
            />
            <button className="btn-icon search-popup__submit" type="submit">
              <svg
                className="d-block"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_search" />
              </svg>
            </button>
            <button
              className="btn-icon btn-close-lg search-popup__reset"
              type="reset"
            ></button>
          </div>

          <div className="search-popup__results">
            <div className="sub-menu search-suggestion">
              <h6 className="sub-menu__title fs-base">Dòng sản phẩm chính</h6>
              <ul className="sub-menu__list list-unstyled">
                {categories?.map((item, index) => (
                  <li className="sub-menu__item" key={index}>
                    <Link
                      href={`${pathNames.STORE}?activeCategory=${item?.id}`}
                      className="menu-link menu-link_us-s"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="search-result row row-cols-5"></div>
          </div>
        </form>
        {/* <!-- /.header-search --> */}
      </div>
      {/* <!-- /.search-popup --> */}
    </div>
  );
}
