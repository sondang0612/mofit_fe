import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Shop1 = dynamic(() => import("@/components/shoplist/Shop1"), {
  ssr: false,
  loading: () => <div>Loading Shop...</div>,
});

const ShopFilter = dynamic(() => import("@/components/asides/ShopFilter"), {
  ssr: false,
  loading: () => <div />,
});

export const metadata = {
  title:
    "Cửa hàng || Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",

  description:
    "Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
};
export default function Store() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper" style={{ margin: "auto" }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Shop1 />
        </Suspense>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShopFilter />
      </Suspense>

      <Footer1 />
    </>
  );
}
