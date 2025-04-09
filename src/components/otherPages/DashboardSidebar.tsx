"use client";
import { dashboardMenuItems } from "@/data/menu";
import { useLogout } from "@/hooks/react-query/auth/useLogout";
import { usePathname, useRouter } from "next/navigation";
import UserInfo from "../account/UserInfo";
import React from "react";
export default function DashboardSidebar() {
  const pathname = usePathname();
  const { mutate: logout } = useLogout();
  const router = useRouter();
  const handleNavigate = (href: string, value: string) => {
    if (value === "logout") {
      logout();
    } else {
      router.push(href);
    }
  };

  return (
    <div className="col-lg-3">
      <UserInfo />
      <ul className="account-nav">
        {dashboardMenuItems.map((elm, i) => (
          <li key={i} className="cursor-pointer">
            <span
              onClick={() => handleNavigate(elm.href, elm.value)}
              className={`menu-link ${
                pathname == elm.href ? "menu-link_active" : ""
              } `}
            >
              {elm.Icon ? (
                elm.Icon({
                  size: 18,
                  color: pathname == elm.href ? "#000" : "#9B9B9B",
                })
              ) : (
                <div style={{ width: 18, height: 18 }} />
              )}
              {elm.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
