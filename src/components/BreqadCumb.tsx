import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { IoReturnUpBack } from "react-icons/io5";

interface Props {
  items?: { label: string; href: string }[];
}

const Breadcrumbs = (props: Props) => {
  const { items = [] } = props;
  const router = useRouter();
  if (!items || items?.length === 0) {
    return null;
  }

  return (
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
              {isLast ? item.label : <Link href={item.href}>{item.label}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
