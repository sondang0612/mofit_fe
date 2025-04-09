import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";
import EditAccount from "@/components/otherPages/EditAccount";
import React from "react";

export const metadata = {
  title:
    "Dashboard Account Edit || Double Fish eCommerce React Nextjs Template",
  description: "Double Fish eCommerce React Nextjs Template",
};
export default function AccountEditPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <div className="row">
            <DashboardSidebar />
            <EditAccount />
          </div>
        </section>
      </main>
      <Footer1 />
    </>
  );
}
