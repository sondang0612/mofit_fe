"use client";
import { useLogout } from "@/hooks/react-query/auth/useLogout";
import { useProfile } from "@/hooks/react-query/auth/useProfile";
import { openCart } from "@/utils/openCart";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import SoftFilter from "../shoplist/filter/SoftFilter";
import Avatar from "./components/Avatar";
import CartLength from "./components/CartLength";
import Nav from "./components/Nav";
import SearchPopup from "./components/SearchPopup";
import User from "./components/User";
import { usePathname } from "next/navigation";

export default function Header1() {
  const [scrollDirection, setScrollDirection] = React.useState("down");
  const { data: profile } = useProfile();
  const { mutate: logout } = useLogout();

  React.useEffect(() => {
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
    <header
      id="header"
      className={`header header_sticky ${
        scrollDirection == "up" ? "header_sticky-active" : "position-absolute"
      } `}
    >
      <div className="h-full px-24">
        <div className="header-desk header-desk_type_1">
          <div className="logo">
            <Link href="/">
              <Image
                src="/assets/images/logo.png"
                width={112}
                height={28}
                alt="Double Fish"
                className="logo__image d-block"
              />
            </Link>
          </div>
          {/* <!-- /.logo --> */}

          <nav className="navigation">
            <ul className="navigation__list list-unstyled d-flex">
              <Nav />
            </ul>

            {/* <!-- /.navigation__list --> */}
          </nav>
          {/* <!-- /.navigation --> */}

          <div className="header-tools d-flex align-items-center">
            <SearchPopup />

            {/* <!-- /.header-tools__item hover-container --> */}

            {profile ? (
              <>
                <div className="user-menu-dropdown_wrapper">
                  <Avatar data={profile} />
                  <div className="user-menu-dropdown">
                    <Link href="/account_edit">Tài khoản của tôi</Link>
                    <Link href="/account_wishlist">Sản phẩm yêu thích</Link>
                    <span onClick={logout}>Thoát</span>
                  </div>
                </div>

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
              </>
            ) : (
              <div className="header-tools__item hover-container">
                <a className="header-tools__item js-open-aside" href="#">
                  <User />
                </a>
              </div>
            )}
          </div>
          {/* <!-- /.header__tools --> */}
        </div>
        {/* <!-- /.header-desk header-desk_type_1 --> */}
      </div>
      <Suspense fallback={<div />}>
        <SoftFilter />
      </Suspense>
      {/* <!-- /.container --> */}
    </header>
  );
}
