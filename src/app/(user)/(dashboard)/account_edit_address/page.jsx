import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";
import EditAddress from "@/components/otherPages/EditAddress";

export const metadata = {
  title:
    "Dashboard Edit Address || Double Fish eCommerce React Nextjs Template",
  description: "Double Fish eCommerce React Nextjs Template",
};
export default function AccountEditAddressPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <div className="row">
            <DashboardSidebar />
            <EditAddress />
          </div>
        </section>
      </main>

      <Footer1 />
    </>
  );
}
