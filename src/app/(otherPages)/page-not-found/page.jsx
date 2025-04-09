import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Notfound from "@/components/otherPages/Notfound";

export const metadata = {
  title:
    "Page không tồn tại || Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
  description:
    "Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
};
export default function PageNotFound() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <Notfound />
      </main>

      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
