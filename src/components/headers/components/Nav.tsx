"use client";
import {
  additionalShopPageitems,
  blogmenuItems,
  homePages,
  shopDetails,
  shopList,
} from "@/data/menu";
import { useBrands } from "@/hooks/react-query/brands/useBrands";
import { useCategories } from "@/hooks/react-query/categories/useCategories";
import { pathNames } from "@/utils/constants/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Nav() {
  const pathname = usePathname();
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const isMenuActive = (menu: any) => {
    return menu?.split("/")[1] == pathname.split("/")[1];
  };
  const isActiveParentMenu = (menus: any) => {
    return menus.some(
      (menu: any) => menu.href.split("/")[1] == pathname.split("/")[1]
    );
  };
  useEffect(() => {
    function setBoxMenuPosition(menu: any) {
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
          href={pathNames.STORE}
          className={`navigation__link
           ${isActiveParentMenu(shopList) ? "menu-active" : ""}
           ${isActiveParentMenu(shopDetails) ? "menu-active" : ""}
           ${isActiveParentMenu(additionalShopPageitems) ? "menu-active" : ""}
           ${pathname?.includes("product") ? "menu-active" : ""}
          `}
        >
          Cửa hàng
        </Link>
        <div className="mega-menu">
          <div className="container d-flex">
            <div className="col pe-4">
              <a href="#" className="sub-menu__title">
                Dòng sản phẩm chính
              </a>
              <ul className="sub-menu__list list-unstyled">
                {categories?.map((elm, i) => (
                  <li key={i} className="sub-menu__item">
                    <Link
                      href={`${pathNames.STORE}?activeCategory=${elm?.id}`}
                      className={`menu-link menu-link_us-s`}
                    >
                      {elm.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col pe-4">
              <a href="#" className="sub-menu__title">
                Thương hiệu
              </a>
              <ul className="sub-menu__list list-unstyled">
                {brands?.map((elm, i) => (
                  <li key={i} className="sub-menu__item">
                    <Link
                      href={`${pathNames.STORE}?brands=${elm?.id}`}
                      className={`menu-link menu-link_us-s`}
                    >
                      {elm?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* <!-- /.container d-flex --> */}
        </div>
      </li>
      <li className="navigation__item">
        <Link
          href={pathNames.ABOUT_US}
          className={`navigation__link ${
            pathname == pathNames.ABOUT_US ? "menu-active" : ""
          }`}
        >
          Về Double Fish
        </Link>
      </li>
      <li className="navigation__item">
        <Link
          href={pathNames.BLOGS}
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
