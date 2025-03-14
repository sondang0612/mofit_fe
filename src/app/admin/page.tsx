"use client";

import React from "react";

const Page = () => {
  return (
    <section className="login-register container">
      <h2 className="d-none">Đăng nhập</h2>
      <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link nav-link_underscore active"
            id="login-tab"
            data-bs-toggle="tab"
            href="#tab-item-login"
            role="tab"
            aria-controls="tab-item-login"
            aria-selected="true"
          >
            Đăng nhập
          </a>
        </li>
      </ul>
      <div className="tab-content pt-2" id="login_register_tab_content">
        <div
          className="tab-pane fade show active"
          id="tab-item-login"
          role="tabpanel"
          aria-labelledby="login-tab"
        >
          <div className="login-form">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="needs-validation"
            >
              <div className="form-floating mb-3">
                <input
                  name="login_email"
                  type="email"
                  className="form-control form-control_gray"
                  placeholder="Email address *"
                  required
                />
                <label>Email address *</label>
              </div>

              <div className="pb-3"></div>

              <div className="form-floating mb-3">
                <input
                  name="login_password"
                  type="password"
                  className="form-control form-control_gray"
                  id="customerPasswodInput"
                  placeholder="Password *"
                  required
                />
                <label htmlFor="customerPasswodInput">Password *</label>
              </div>
              <button
                className="btn btn-primary w-100 text-uppercase"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
