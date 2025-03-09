"use client";
import { dashboardMenuItems } from "@/data/menu";
import { useLogout } from "@/hooks/react-query/auth/useLogout";
import { usePathname, useRouter } from "next/navigation";
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
      <ul className="account-nav">
        {dashboardMenuItems.map((elm, i) => (
          <li key={i} className="cursor-pointer">
            <span
              onClick={() => handleNavigate(elm.href, elm.value)}
              className={`menu-link menu-link_us-s ${
                pathname == elm.href ? "menu-link_active" : ""
              } `}
            >
              {elm.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
