import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import Dashboard from "@/components/otherPages/Dashboard";
import DashboardSidebar from "@/components/otherPages/DashboardSidebar";
import React from "react";

export const metadata = {
  title: "Dashboard-account || Double Fish eCommerce React Nextjs Template",
  description: "Double Fish eCommerce React Nextjs Template",
};
export default function AccountPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-4 pb-4"></div>
        <section className="my-account container">
          <div className="row">
            <DashboardSidebar />
            <Dashboard />
          </div>
        </section>
      </main>

      <Footer1 />
    </>
  );
}
