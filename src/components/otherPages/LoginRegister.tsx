"use client";
import React from "react";
import Link from "next/link";
import { useUrlParams } from "@/hooks/useUrlParams";

export default function LoginRegister() {
  const { getParam, setParams } = useUrlParams();
  const isRegister = getParam("isRegister");

  const open = (formType: "register" | "login") => {
    if (formType === "register") {
      setParams([{ key: "isRegister", value: true }]);
    } else {
      setParams([{ key: "isRegister", value: false }]);
    }
  };

  return (
    <section className="login-register container">
      <h2 className="d-none">Đăng nhập & Đăng ký</h2>
      <ul className="nav nav-tabs mb-5" id="login_register" role="tablist">
        <li className="nav-item" role="presentation">
          <span
            className={`nav-link nav-link_underscore ${
              !(isRegister === "true") ? "active" : ""
            }`}
            id="login-tab"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-item-login"
            aria-selected="true"
            onClick={() => open("login")}
          >
            Đăng nhập
          </span>
        </li>
        <li className="nav-item" role="presentation">
          <span
            className={`nav-link nav-link_underscore ${
              isRegister === "true" ? "active" : ""
            }`}
            id="register-tab"
            data-bs-toggle="tab"
            role="tab"
            aria-controls="tab-item-register"
            aria-selected="false"
            onClick={() => open("register")}
          >
            Đăng ký
          </span>
        </li>
      </ul>
      <div className="tab-content pt-2" id="login_register_tab_content">
        {!(isRegister === "true") ? (
          <div id="tab-item-login" role="tabpanel" aria-labelledby="login-tab">
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
                  <label>Email *</label>
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
                  <label htmlFor="customerPasswodInput">Mật khẩu *</label>
                </div>

                <div className="d-flex align-items-center mb-3 pb-2">
                  <div className="form-check mb-0">
                    <input
                      name="remember"
                      className="form-check-input form-check-input_fill"
                      type="checkbox"
                      defaultValue=""
                    />
                    <label className="form-check-label text-secondary">
                      Ghi nhớ
                    </label>
                  </div>
                  <Link href="/reset_password" className="btn-text ms-auto">
                    Quên mật khẩu?
                  </Link>
                </div>

                <button
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit"
                >
                  Đăng nhập
                </button>

                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">Chưa có tài khoản?</span>{" "}
                  <span
                    className="btn-text js-show-register"
                    onClick={() => open("register")}
                  >
                    Tạo tài khoản
                  </span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div
            id="tab-item-register"
            role="tabpanel"
            aria-labelledby="register-tab"
          >
            <div className="register-form">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="needs-validation"
              >
                <div className="form-floating mb-3">
                  <input
                    name="register_username"
                    type="text"
                    className="form-control form-control_gray"
                    id="customerNameRegisterInput"
                    placeholder="Username"
                    required
                  />
                  <label htmlFor="customerNameRegisterInput">Username</label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    name="register_email"
                    type="email"
                    className="form-control form-control_gray"
                    id="customerEmailRegisterInput"
                    placeholder="Email address *"
                    required
                  />
                  <label htmlFor="customerEmailRegisterInput">Email *</label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    name="register_password"
                    type="password"
                    className="form-control form-control_gray"
                    id="customerPasswodRegisterInput"
                    placeholder="Password *"
                    required
                  />
                  <label htmlFor="customerPasswodRegisterInput">
                    Mật khẩu *
                  </label>
                </div>

                <div className="d-flex align-items-center mb-3 pb-2">
                  <p className="m-0">
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our privacy policy.
                  </p>
                </div>

                <button
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
