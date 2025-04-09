import { useProfile } from "@/hooks/react-query/auth/useProfile";
import { pathNames } from "@/utils/constants/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { MdStorefront } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

export default function MobileFooter1() {
  const [showFooter, setShowFooter] = useState(false);
  const pathName = usePathname();
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
            <AiOutlineHome size={18} />
            <span>Trang chủ</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

        <div className="col-4">
          <Link
            href={pathNames.STORE}
            className="footer-mobile__link d-flex flex-column align-items-center"
          >
            <MdStorefront size={18} />
            <span>Cửa hàng</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}

        <div className="col-4">
          <Link
            href={
              profile ? "/account_edit" : "/login_register?isRegister=false"
            }
            className={`footer-mobile__link d-flex flex-column align-items-center`}
          >
            <LuUserRound size={18} />
            <span>{profile ? "Tài khoản" : "Đăng nhập"}</span>
          </Link>
        </div>
        {/* <!-- /.col-3 --> */}
      </div>
      {/* <!-- /.row --> */}
    </footer>
  );
}
