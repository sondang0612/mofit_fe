"use client";

import { pathNames } from "@/utils/constants/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function MobileNav() {
  const pathname = usePathname();

  useEffect(() => {
    const selectors = {
      mobileMenuActivator: ".mobile-nav-activator",
      mobileMenu: ".navigation",
      mobileMenuActiveClass: "mobile-menu-opened",
      mobileSubNavOpen: ".js-nav-right",
      mobileSubNavClose: ".js-nav-left",
      mobileSubNavHiddenClass: "d-none",
    };

    const mobileMenuActivator = document.querySelector(
      selectors.mobileMenuActivator
    );
    const mobileDropdown = document.querySelector(selectors.mobileMenu);
    let transformLeft = 0;

    const toggleMobileMenu = (event) => {
      if (event) {
        event.preventDefault();
      }

      if (document.body.classList.contains(selectors.mobileMenuActiveClass)) {
        document.body.classList.remove(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "";
        mobileDropdown.style.paddingRight = "";
      } else {
        document.body.classList.add(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "scrollWidth"; // Replace with appropriate value
        mobileDropdown.style.paddingRight = "scrollWidth"; // Replace with appropriate value
      }
    };

    if (mobileDropdown) {
      mobileMenuActivator &&
        mobileMenuActivator.addEventListener("click", toggleMobileMenu);

      const mobileMenu = mobileDropdown.querySelector(".navigation__list");
      let menuMaxHeight = mobileMenu.offsetHeight;

      const openSubNav = (event, btn) => {
        event.preventDefault();
        btn.nextElementSibling.classList.remove(
          selectors.mobileSubNavHiddenClass
        );

        transformLeft -= 100;
        if (menuMaxHeight < btn.nextElementSibling.offsetHeight) {
          mobileMenu.style.transform = `translateX(${transformLeft}%)`;
          mobileMenu.style.minHeight = `${btn.nextElementSibling.offsetHeight}px`;
        } else {
          mobileMenu.style.transform = `translateX(${transformLeft}%)`;
          mobileMenu.style.minHeight = `${menuMaxHeight}px`;
        }
      };

      const closeSubNav = (event, btn) => {
        event.preventDefault();
        transformLeft += 100;
        mobileMenu.style.transform = `translateX(${transformLeft}%)`;
        btn.parentElement.classList.add(selectors.mobileSubNavHiddenClass);
        const wrapper = btn.closest(".sub-menu");
        if (wrapper) {
          const minHeight =
            menuMaxHeight < wrapper.offsetHeight
              ? wrapper.offsetHeight
              : menuMaxHeight;
          mobileMenu.style.minHeight = `${minHeight}px`;
        }
      };

      mobileMenu &&
        Array.from(
          mobileMenu.querySelectorAll(selectors.mobileSubNavOpen)
        ).forEach((btn) => {
          btn.addEventListener("click", (event) => openSubNav(event, btn));
        });

      mobileMenu &&
        Array.from(
          mobileMenu.querySelectorAll(selectors.mobileSubNavClose)
        ).forEach((btn) => {
          btn.addEventListener("click", (event) => closeSubNav(event, btn));
        });

      return () => {
        mobileMenuActivator &&
          mobileMenuActivator.removeEventListener("click", toggleMobileMenu);
        mobileMenu &&
          Array.from(
            mobileMenu.querySelectorAll(selectors.mobileSubNavOpen)
          ).forEach((btn) => {
            btn.removeEventListener("click", (event) => openSubNav(event, btn));
          });
        mobileMenu &&
          Array.from(
            mobileMenu.querySelectorAll(selectors.mobileSubNavClose)
          ).forEach((btn) => {
            btn.removeEventListener("click", (event) =>
              closeSubNav(event, btn)
            );
          });
      };
    }
  }, []);
  useEffect(() => {
    const selectors = {
      mobileMenuActivator: ".mobile-nav-activator",
      mobileMenu: ".navigation",
      mobileMenuActiveClass: "mobile-menu-opened",
      mobileSubNavOpen: ".js-nav-right",
      mobileSubNavClose: ".js-nav-left",
      mobileSubNavHiddenClass: "d-none",
    };

    const mobileDropdown = document.querySelector(selectors.mobileMenu);

    const removeMenu = (event) => {
      if (event) {
        event.preventDefault();
      }

      if (document.body.classList.contains(selectors.mobileMenuActiveClass)) {
        document.body.classList.remove(selectors.mobileMenuActiveClass);
        document.body.style.paddingRight = "";
        mobileDropdown.style.paddingRight = "";
      }
    };
    removeMenu();
  }, [pathname]);

  return (
    <>
      <li className="navigation__item">
        <Link
          href="/"
          className={`navigation__link w-full ${
            pathname === "/" ? "menu-active" : ""
          }`}
        >
          Trang chủ
        </Link>
      </li>
      <li className="navigation__item">
        <Link
          href={pathNames.STORE}
          className={`navigation__link w-full ${
            pathname == pathNames.STORE ? "menu-active" : ""
          }`}
        >
          Cửa hàng
        </Link>
      </li>

      <li className="navigation__item">
        <Link
          href="/about"
          className={`navigation__link w-full ${
            pathname == "/about" ? "menu-active" : ""
          }`}
        >
          Về Double Fish
        </Link>
      </li>

      <li className="navigation__item">
        <Link
          href="/blog_list2"
          className={`navigation__link w-full ${
            pathname === "/blog_list2" ? "menu-active" : ""
          }`}
        >
          Tin tức
        </Link>
      </li>
      <li className="navigation__item">
        <Link
          href="/contact"
          className={`navigation__link w-full ${
            pathname == "/contact" ? "menu-active" : ""
          }`}
        >
          Liên hệ
        </Link>
      </li>
    </>
  );
}
