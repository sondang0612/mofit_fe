import Header from "@/components/admin/Header";
import SideBar from "@/components/admin/SideBar";
import React from "react";

// src/app/admin/layout.jsx
export default function AdminLayout({ children }: any) {
  return (
    <div className="d-flex vh-100">
      <SideBar />

      <div className="d-flex flex-column flex-grow-1">
        <Header />

        <main className="flex-grow-1 p-2 bg-light overflow-auto p-3">
          {children}
        </main>
      </div>
    </div>
  );
}
