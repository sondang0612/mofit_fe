import { useContextElement } from "@/context/Context";
import { useProfile } from "@/hooks/react-query/auth/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";

export default function MobileFooter1() {
  const [showFooter, setShowFooter] = useState(false);
  const { data: profile } = useProfile();

  useEffect(() => {
    setShowFooter(true);
  }, []);

  return (
    <footer
      className={`footer-mobile container w-100 px-5 d-md-none bg-body ${
        showFooter ? "position-fixed footer-mobile_initialized" : ""
      }`}
    >
      <div className="row text-center">
        <div className="col-4">
          <Link
            href="/"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_home" />
            </svg>
            <span>Home</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

        <div className="col-4">
          <Link
            href="/shop-1"
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <svg
              className="d-block"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon_hanger" />
            </svg>
            <span>Shop</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

        <div className="col-4">
          <Link
            href={
              profile?.data
                ? "/account_edit"
                : "login_register?isRegister=false"
            }
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <LuUserRound size={18} />
            <span>{profile?.data ? "Tài khoản" : "Đăng nhập"}</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}
      </div>
      {/* <!-- /.row --> */}
    </footer>
  );
}
