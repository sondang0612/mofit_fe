import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Lookbook from "@/components/otherPages/Lookbook";
import React from "react";

export const metadata = {
  title:
    "Lookbook || Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
  description:
    "Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
};
export default function LookbookPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <Lookbook />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
