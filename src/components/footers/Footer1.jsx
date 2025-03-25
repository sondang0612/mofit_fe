"use client";
import {
  footerLinks1,
  footerLinks2,
  footerLinks3,
  socialLinks,
} from "@/data/footer";
import Link from "next/link";

export default function Footer1() {
  return (
    <footer className="footer footer_type_1 dark">
      <div className="footer-middle px-24">
        <div className="row row-cols-lg-5 row-cols-2">
          <div className="footer-column footer-store-info col-12 mb-4 mb-lg-0">
            <p className="footer-address">
              Số 160, đường Trần Não, khu phố 2,Phường An Khánh,Thành phố Thủ
              Đức, Hồ Chí Minh,Việt Nam
            </p>

            <p className="m-0">
              <strong className="fw-medium">info@evovietnam.com.vn</strong>
            </p>
            <p>
              <strong className="fw-medium">+84 315 636 871</strong>
            </p>

            <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target="_blank"
                    className="footer__social-link d-block"
                  >
                    <svg
                      className={link.className}
                      width={link.width}
                      height={link.height}
                      viewBox={link.viewBox}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {typeof link.icon === "string" ? (
                        <use href={link.icon} />
                      ) : (
                        link.icon
                      )}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- /.footer-column --> */}

          <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">Công ty</h5>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks1.map((elm, i) => (
                <li key={i} className="sub-menu__item">
                  <Link href={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- /.footer-column --> */}
          <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">Cửa hàng</h5>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks2.map((elm, i) => (
                <li key={i} className="sub-menu__item">
                  <Link href={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- /.footer-column --> */}
          <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">Hỗ trợ</h5>
            <ul className="sub-menu__list list-unstyled">
              {footerLinks3.map((elm, i) => (
                <li key={i} className="sub-menu__item">
                  <Link href={elm.href} className="menu-link menu-link_us-s">
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- /.footer-column --> */}
          <div className="footer-column footer-newsletter col-12 mb-4 mb-lg-0">
            <h5 className="sub-menu__title text-uppercase">
              Tham gia ngay trong hôm nay
            </h5>
            <p>Giảm giá lên đến 10% cho đơn hàng đầu tiên.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="footer-newsletter__form position-relative bg-body"
            >
              <input
                className="form-control border-white"
                type="email"
                name="email"
                placeholder="Email"
              />
              <input
                className="btn-link fw-medium bg-white position-absolute top-0 end-0 h-100"
                type="submit"
                defaultValue="Tham gia"
              />
            </form>
          </div>
          {/* <!-- /.footer-column --> */}
        </div>
        {/* <!-- /.row-cols-5 --> */}
      </div>
    </footer>
  );
}
