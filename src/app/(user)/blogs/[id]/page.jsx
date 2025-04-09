import BlogDetails from "@/components/blogs/BlogDetails";
import Breadcrumb from "@/components/Breadcrumb";
import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import { allBlogs } from "@/data/blogs";
import React from "react";

export default function BlogDetailsPage({ params }) {
  const id = params.id;
  const blog = allBlogs.filter((elm) => elm.id == id)[0] || allBlogs[0];
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Breadcrumb />
        <div className="mb-2 pb-2"></div>
        <BlogDetails blog={blog} />
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
