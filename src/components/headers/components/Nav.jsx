"use client";
import {
  additionalShopPageitems,
  blogmenuItems,
  homePages,
  othersMenuItems,
  shopDetails,
  shopList,
} from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const isMenuActive = (menu) => {
    return menu.split("/")[1] == pathname.split("/")[1];
  };
  const isActiveParentMenu = (menus) => {
    return menus.some(
      (menu) => menu.href.split("/")[1] == pathname.split("/")[1]
    );
  };
  useEffect(() => {
    function setBoxMenuPosition(menu) {
      const scrollBarWidth = 17; // You might need to calculate or define this value
      const limitR = window.innerWidth - menu.offsetWidth - scrollBarWidth;
      const limitL = 0;
      const menuPaddingLeft = parseInt(
        window.getComputedStyle(menu, null).getPropertyValue("padding-left")
      );
      const parentPaddingLeft = parseInt(
        window
          .getComputedStyle(menu.previousElementSibling, null)
          .getPropertyValue("padding-left")
      );
      const centerPos =
        menu.previousElementSibling.offsetLeft -
        menuPaddingLeft +
        parentPaddingLeft;

      let menuPos = centerPos;
      if (centerPos < limitL) {
        menuPos = limitL;
      } else if (centerPos > limitR) {
        menuPos = limitR;
      }

      menu.style.left = `${menuPos}px`;
    }
    document.querySelectorAll(".box-menu").forEach((el) => {
      setBoxMenuPosition(el);
    });
  }, []);
  return (
    <>
      <li className="navigation__item">
        <Link
          href="/"
          className={`navigation__link ${
            isActiveParentMenu(homePages) ? "menu-active" : ""
          }`}
        >
          Trang chủ
        </Link>
        {/* <!-- /.box-menu --> */}
      </li>
      <li className="navigation__item">
        <Link
          href="/shop-1"
          className={`navigation__link
           ${isActiveParentMenu(shopList) ? "menu-active" : ""}
           ${isActiveParentMenu(shopDetails) ? "menu-active" : ""}
           ${isActiveParentMenu(additionalShopPageitems) ? "menu-active" : ""}
          `}
        >
          Cửa hàng
        </Link>
      </li>
      <li className="navigation__item">
        <Link
          href="/about"
          className={`navigation__link ${
            pathname == "/about" ? "menu-active" : ""
          }`}
        >
          Về Double Fish
        </Link>
      </li>
      <li className="navigation__item">
        <Link
          href="/blog_list2"
          className={`navigation__link ${
            isActiveParentMenu(blogmenuItems) ? "menu-active" : ""
          }`}
        >
          Tin tức
        </Link>
      </li>
      <li className="navigation__item">
        <Link
          href="/contact"
          className={`navigation__link ${
            pathname == "/contact" ? "menu-active" : ""
          }`}
        >
          Liên hệ
        </Link>
      </li>
    </>
  );
}
