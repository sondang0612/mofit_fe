"use client";
import React from "react";

const Page = () => {
  return (
    <div className="container mt-4 p-4 bg-light shadow-sm bg-white">
      <h4 className="fw-bold mb-4 text-primary">Tạo sản phẩm mới</h4>
      <form className="needs-validation" style={{ minHeight: 500 }}>
        <div className="form-floating mb-3">
          <input
            type="name"
            className="form-control form-control_gray"
            placeholder="Email address *"
            required
          />
          <label>Tên *</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control_gray"
            id="customerPasswodInput"
            placeholder="Password *"
            required
          />
          <label htmlFor="customerPasswodInput">SKU *</label>
        </div>

        <div className="d-flex align-items-center mb-3 pb-2"></div>

        <button className="btn btn-primary w-100 text-uppercase" type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Page;
