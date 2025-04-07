"use client";

import { useProfile } from "@/hooks/react-query/auth/useProfile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiShoppingBasket, CiUser } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { RiOrderPlayLine } from "react-icons/ri";
import Avatar from "../headers/components/Avatar";
import Role from "../Role";

export const adminSlidebar = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <MdOutlineAnalytics size={20} color="#333" />,
    value: "dashboard",
  },
  {
    label: "Người dùng",
    href: "/admin/users",
    icon: <CiUser size={20} color="#333" />,
    value: "users",
  },
  {
    label: "Sản phẩm",
    href: "/admin/products",
    icon: <CiShoppingBasket size={20} color="#333" />,
    value: "products",
  },
  {
    label: "Đơn hàng",
    href: "/admin/orders",
    icon: <RiOrderPlayLine size={20} color="#333" />,
    value: "orders",
  },
];

const SideBar = () => {
  const pathName = usePathname();
  const { data: profile } = useProfile();

  return (
    <div className="sidebar">
      <img src="/assets/images/logo.png" alt="Double Fish" />

      <div
        className="d-flex align-items-center justify-content-between px-2 w-full"
        style={{ paddingTop: 12, paddingBottom: 12 }}
      >
        <div className="d-flex align-items-center">
          <Avatar data={profile} marginRight={8} size={40} />
          <div>
            <div className="text-sm">{profile?.username}</div>
            <Role role={profile?.role} />
          </div>
        </div>
        <IoLogOutOutline size={24} color="red" className="cursor-pointer" />
      </div>

      <ul className="nav flex-column">
        {adminSlidebar?.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              href={item.href}
              className={`nav-link ${
                pathName?.includes(item.value) && "active"
              } d-flex align-items-center gap-2`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
