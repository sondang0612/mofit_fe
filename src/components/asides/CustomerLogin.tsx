"use client";

import { useLogin } from "@/hooks/react-query/auth/useLogin";
import { closeModalUserlogin } from "@/utils/aside";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export default function CustomerLogin() {
  const [username, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const { mutate: login, isSuccess } = useLogin();

  const isValidForm = React.useMemo(() => {
    return username.length !== 0 && password.length !== 0;
  }, [username, password]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidForm) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    login({ username, password });
  };

  React.useEffect(() => {
    const pageOverlay = document.getElementById("pageOverlay");

    pageOverlay?.addEventListener("click", closeModalUserlogin);

    return () => {
      pageOverlay?.removeEventListener("click", closeModalUserlogin);
    };
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      closeModalUserlogin();
    }
  }, [isSuccess]);

  const navigate = (url: string) => {
    closeModalUserlogin();
    router.push(url);
  };

  return (
    <div
      id="userAside"
      className="aside aside_right overflow-hidden customer-forms "
    >
      <div className="customer-forms__wrapper d-flex position-relative">
        <div className="customer__login">
          <div className="aside-header d-flex align-items-center">
            <h3 className="text-uppercase fs-6 mb-0">Đăng nhập</h3>
            <button
              onClick={() => closeModalUserlogin()}
              className="btn-close-lg js-close-aside ms-auto"
            />
          </div>
          <form
            onSubmit={handleLogin}
            className="aside-content"
            id="login-form"
          >
            <div className="form-floating mb-3">
              <input
                name="username"
                type="username"
                className="form-control form-control_gray"
                placeholder="Tên đăng nhập"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email *</label>
            </div>
            <div className="pb-3" />
            <div className="form-label-fixed mb-3">
              <label className="form-label">Mật khẩu *</label>
              <input
                name="password"
                className="form-control form-control_gray"
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center mb-3 pb-2">
              <div className="form-check mb-0">
                <input
                  name="remember"
                  className="form-check-input form-check-input_fill"
                  type="checkbox"
                  defaultValue={0}
                />
                <label className="form-check-label text-secondary">
                  Nhớ mật khẩu
                </label>
              </div>
              <div
                onClick={() => navigate("/reset_password")}
                className="btn-text ms-auto"
              >
                Đặt lại mật khẩu
              </div>
            </div>
            <button
              className="btn btn-primary w-100 text-uppercase"
              type="submit"
              form="login-form"
            >
              Đăng nhập
            </button>
            <div className="customer-option mt-4 text-center">
              <span className="text-secondary">Chưa có tài khoản?</span>{" "}
              <span
                onClick={() => navigate("/login_register?isRegister=true")}
                className="btn-text js-show-register"
              >
                Đăng ký ngay
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
