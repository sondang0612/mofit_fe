"use client";

import { socialLinks } from "@/data/socials";

import { useProfile } from "@/hooks/react-query/auth/useProfile";
import { openCart } from "@/utils/openCart";
import Image from "next/image";
import { useEffect, useState } from "react";
import CartLength from "./components/CartLength";
import MobileNav from "./components/MobileNav";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SoftFilter from "../shoplist/filter/SoftFilter";
import { pathNames } from "@/utils/constants/paths";

type Form = {
  searchQuery: string;
};

const defaultValues = {
  searchQuery: "",
};

export default function MobileHeader() {
  const [scrollDirection, setScrollDirection] = useState("down");
  const { data: profile } = useProfile();
  const { register, handleSubmit } = useForm<Form>({ defaultValues });
  const router = useRouter();

  const onSubmit = (data: Form) => {
    router.push(`${pathNames.STORE}?searchQuery=${data?.searchQuery}`);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 250) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setScrollDirection("down");
        } else {
          // Scrolling up
          setScrollDirection("up");
        }
      } else {
        // Below 250px
        setScrollDirection("down");
      }

      lastScrollY.current = currentScrollY;
    };

    const lastScrollY = { current: window.scrollY };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`header-mobile header_sticky ${
        scrollDirection == "up" ? "header_sticky-active" : "position-absolute"
      } `}
    >
      <div className="container d-flex align-items-center h-100">
        <a className="mobile-nav-activator d-block position-relative" href="#">
          <svg
            className="nav-icon"
            width="25"
            height="18"
            viewBox="0 0 25 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon_nav" />
          </svg>
          <span className="btn-close-lg position-absolute top-0 start-0 w-100"></span>
        </a>

        <div className="logo">
          <a href="/">
            <Image
              src="/assets/images/logo.png"
              width={112}
              height={28}
              alt="Double Fish"
              className="logo__image d-block"
            />
          </a>
        </div>
        {/* <!-- /.logo --> */}
        {profile && (
          <a
            onClick={() => openCart()}
            className="header-tools__item header-tools__cart js-open-aside"
          >
            <svg
              className="d-block"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_cart" />
            </svg>
            <span className="cart-amount d-block position-absolute js-cart-items-count">
              <CartLength />
            </span>
          </a>
        )}
      </div>
      {/* <!-- /.container --> */}

      <nav className="header-mobile__navigation navigation d-flex flex-column w-100 position-absolute top-100 bg-body overflow-auto">
        <div className="container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="search-field position-relative mt-4 mb-3"
          >
            <div className="position-relative">
              <input
                className="search-field__input w-100 border rounded-1"
                type="text"
                placeholder="Search products"
                {...register("searchQuery")}
              />
              <button
                className="btn-icon search-popup__submit pb-0 me-2"
                type="submit"
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
              </button>
              <button
                className="btn-icon btn-close-lg search-popup__reset pb-0 me-2"
                type="reset"
              ></button>
            </div>

            <div className="position-absolute start-0 top-100 m-0 w-100">
              <div className="search-result"></div>
            </div>
          </form>
          {/* <!-- /.header-search --> */}
        </div>
        {/* <!-- /.container --> */}

        <div className="container">
          <div className="overflow-hidden">
            <ul className="navigation__list list-unstyled position-relative">
              <MobileNav />
            </ul>
            {/* <!-- /.navigation__list --> */}
          </div>
          {/* <!-- /.overflow-hidden --> */}
        </div>
        {/* <!-- /.container --> */}

        <div className="border-top mt-auto pb-2">
          <ul className="container social-links list-unstyled d-flex flex-wrap mb-0">
            {socialLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="footer__social-link d-block color-white"
                >
                  <svg
                    className={link.className}
                    width={link.width}
                    height={link.height}
                    viewBox={link.viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <use href={link.icon} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <SoftFilter isMobile />
      {/* <!-- /.navigation --> */}
    </div>
  );
}
