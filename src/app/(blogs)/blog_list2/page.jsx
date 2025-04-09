import Blog2 from "@/components/blogs/Blog2";

import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import React from "react";

export const metadata = {
  title:
    "Tin tức || Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
  description:
    "Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
};
export default function BlogPage2() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Blog2 />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
