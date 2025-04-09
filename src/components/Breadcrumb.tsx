"use client";
import { pathNameLabel } from "@/utils/constants/paths";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { IoReturnUpBack } from "react-icons/io5";

const Breadcrumb = () => {
  const pathName = usePathname();

  const items = React.useMemo(() => {
    let paths = pathName.split("/");

    if (pathName.includes("product")) {
      paths[2] = paths[1];
      paths[1] = "store";
    }

    return paths.map((item: any) => ({
      label: pathNameLabel[item] || item,
      href: `/${item}`,
    }));
  }, [pathName]);

  const router = useRouter();
  if (!items || items?.length === 0) {
    return null;
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-1">
          <IoReturnUpBack
            size={24}
            style={{ marginRight: 8 }}
            onClick={router.back}
          />
          {items?.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={index}
                className={`breadcrumb-item ${isLast ? "active" : ""}`}
                {...(isLast ? { "aria-current": "page" } : {})}
              >
                {isLast ? (
                  item.label
                ) : (
                  <Link href={item.href}>{item.label}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default React.memo(Breadcrumb);
