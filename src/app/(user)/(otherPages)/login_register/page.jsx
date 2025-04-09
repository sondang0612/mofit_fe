import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import LoginRegister from "@/components/otherPages/LoginRegister";
import React, { Suspense } from "react";

export const metadata = {
  title:
    "Đăng nhập || Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
  description:
    "Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
};
export default function LoginPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <Suspense fallback={<p>loading...</p>}>
          <LoginRegister />
        </Suspense>
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
