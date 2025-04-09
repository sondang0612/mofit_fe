import { pathNames } from "@/utils/constants/paths";
import { FaHeart, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";

export const homePages = [{ id: 1, title: "Home 1", href: "/" }];

export const shopList = [
  {
    id: 1,
    href: "/store",
    title: "Cửa hàng",
  },
];
export const shopDetails = [
  { id: 1, href: "/product2_variable/1", title: "Shop Detail V1" },
  { id: 2, href: "/product7_v2/1", title: "Shop Detail V2" },
  { id: 3, href: "/product8_v3/1", title: "Shop Detail V3" },
  { id: 4, href: "/product9_v4/1", title: "Shop Detail V4" },
  { id: 5, href: "/product10_v5/1", title: "Shop Detail V5" },
  { id: 6, href: "/product11_v6/1", title: "Shop Detail V6" },
  { id: 7, href: "/product12_v7/1", title: "Shop Detail V7" },
  { id: 8, href: "/product13_v8/1", title: "Shop Detail V8" },
  { id: 9, href: "/product14_v9/1", title: "Shop Detail V9" },
  { id: 10, href: "/product15_v10/1", title: "Shop Detail V10" },
  { id: 11, href: "/product16_v11/1", title: "Shop Detail V11" },
];

export const additionalShopPageitems = [
  { id: 1, href: "/shop-12", title: "Collection Grid" },
  { id: 2, href: "/1", title: "Simple Product" },
  { id: 3, href: "/product2_variable/2", title: "Variable Product" },
  { id: 4, href: "/product3_external/2", title: "External Product" },
  { id: 5, href: "/product4_grouped/2", title: "Grouped Product" },
  { id: 6, href: "/product5_onsale/2", title: "On Sale" },
  { id: 7, href: "/product6_outofstock/2", title: "Out of Stock" },
  { id: 8, href: "/shop_cart", title: "Shopping Cart" },
  { id: 9, href: "/shop_checkout", title: "Checkout" },
  { id: 10, href: "/shop_order_complete", title: "Order Complete" },
  { id: 11, href: "/shop_order_tracking", title: "Order Tracking" },
];

export const blogmenuItems = [
  {
    id: 1,
    href: "/blog_list1",

    title: "Blog V1",
  },
  {
    id: 2,
    href: pathNames.BLOGS,

    title: "Blog V2",
  },
  {
    id: 3,
    href: "/blog_list3",

    title: "Blog V3",
  },
  {
    id: 4,
    href: "/blog_single/1",

    title: "Blog Detail",
  },
];

export const othersMenuItems = [
  {
    id: 1,
    href: "/account_dashboard",
    title: "Tài khoản của tôi",
  },
  {
    id: 2,
    href: "/login_register",
    title: "Đăng nhập / Đăng ký",
  },
  {
    id: 3,
    href: "/store_location",
    title: "Store Locator",
  },
  {
    id: 4,
    href: "/lookbook",
    title: "Lookbook",
  },
  {
    id: 5,
    href: "/faq",
    title: "Faq",
  },
  {
    id: 6,
    href: "/terms",
    title: "Terms",
  },
  {
    id: 7,
    href: "/page-not-found",
    title: "404 Error",
  },
  {
    id: 8,
    href: "/coming_soon",
    title: "Coming Soon",
  },
];

export const dashboardMenuItems = [
  {
    id: 1,
    href: "/account_edit",
    title: "Thông tin tài khoản",
    value: "account_edit",
    Icon: FaUser,
  },
  {
    id: 2,
    href: "/account_orders",
    title: "Quản lý đơn hàng",
    value: "account_orders",
    Icon: RiFileListFill,
  },
  {
    id: 3,
    href: "/account_edit_address",
    title: "Sổ địa chỉ",
    value: "account_edit_address",
    Icon: FaLocationDot,
  },
  // {
  //   id: 4,
  //   href: "/account_wishlist",
  //   title: "Sản phẩm yêu thích",
  //   value: "account_wishlist",
  //   Icon: FaHeart,
  // },
  {
    id: 5,
    href: "/login_register",
    title: "Đăng xuất",
    value: "logout",
    Icon: null,
  },
];
