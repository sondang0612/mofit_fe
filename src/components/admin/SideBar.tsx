"use client";

import { adminSlidebar } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const pathName = usePathname();

  return (
    <div className="sidebar">
      <img src="/assets/images/logo.png" alt="Double Fish" />

      <ul className="nav flex-column">
        {adminSlidebar?.map((item, index) => (
          <li className="nav-item" key={index}>
            <Link
              href={item.href}
              className={`nav-link ${item.href === pathName && "active"}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
