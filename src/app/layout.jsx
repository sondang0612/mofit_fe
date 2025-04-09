"use client";
import CustomerLogin from "@/components/asides/CustomerLogin";
import ProductAdditionalInformation from "@/components/asides/ProductAdditionalInformation";
import ProductDescription from "@/components/asides/ProductDescription";
import ProductReviews from "@/components/asides/ProductReviews";
import LoginFormPopup from "@/components/common/LoginFormPopup";
import ScrollTop from "@/components/common/ScrollTop";
import Svgs from "@/components/common/Svgs";
import MobileFooter1 from "@/components/footers/MobileFooter1";
import MobileHeader from "@/components/headers/MobileHeader";
import Delivery from "@/components/modals/Delivery";
import QuickView from "@/components/modals/QuickView";
import SiteMap from "@/components/modals/SiteMap";
import SizeGuide from "@/components/modals/SizeGuide";
import CartDrawer from "@/components/shopCartandCheckout/CartDrawer";
import Context from "@/context/Context";
import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import "rc-slider/assets/index.css";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
import "tippy.js/dist/tippy.css";
import "../../public/assets/css/plugins/swiper.min.css";
import "../../public/assets/sass/style.scss";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathName = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);

  const isAdmin = React.useMemo(() => {
    return pathName?.includes("admin");
  }, [pathName?.includes("admin")]);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <QueryProvider>
            <Svgs />
            <Context>
              {!isAdmin && <MobileHeader />}
              {children}
              {!isAdmin && <MobileFooter1 />}
              {/* //modals and asides */}
              <LoginFormPopup />
              <QuickView />
              {/* <NewsLetter /> */}
              {/* <CookieContainer /> */}
              <SizeGuide />
              <Delivery />
              {!isAdmin && <CartDrawer />}
              <SiteMap />
              <CustomerLogin />
              <ProductDescription />
              <ProductAdditionalInformation />
              <ProductReviews />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Context>
            <div className="page-overlay" id="pageOverlay"></div>
            <ScrollTop />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
