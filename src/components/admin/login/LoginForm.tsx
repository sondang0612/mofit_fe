"use client";
import { useLogin } from "@/hooks/react-query/auth/useLogin";
import { ERole } from "@/utils/constants/role.enum";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  username: string;
  password: string;
};

const defaultValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const { mutate: login } = useLogin();
  const { register, handleSubmit } = useForm<Form>({
    defaultValues,
  });

  const checkValid = (data: Form) => {
    if (data?.password && data?.password?.length < 6) {
      toast.error("Mật khẩu phải hơn 6 kí tự");
      return false;
    }

    return true;
  };

  const onSubmit = (data: Form) => {
    const isValid = checkValid(data);
    if (isValid) {
      login({ ...data, role: ERole.ADMIN });
    }
  };

  return (
    <section className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow-lg p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">Đăng nhập Admin</h3>
        <form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Email / Username *</label>
            <div className="input-group">
              <span className="input-group-text">
                {/* SVG Icon Email */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM20 8L12 13L4 8V18H20V8ZM12 11L20 6H4L12 11Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <input
                className="form-control"
                placeholder="Nhập email / Username"
                required
                {...register("username")}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Mật khẩu *</label>
            <div className="input-group">
              <span className="input-group-text">
                {/* SVG Icon Lock */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H7V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V10ZM12 14C12.55 14 13 14.45 13 15C13 15.55 12.55 16 12 16C11.45 16 11 15.55 11 15C11 14.45 11.45 14 12 14ZM19 10V7C19 3.13 15.87 0 12 0C8.13 0 5 3.13 5 7V10C3.9 10 3 10.9 3 12V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V12C21 10.9 20.1 10 19 10Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                required
                {...register("password")}
              />
            </div>
          </div>

          <div className="d-flex mb-3 align-items-center gap-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <span className="form-check-label">Nhớ mật khẩu</span>
          </div>

          <button
            className="btn btn-primary w-100 text-uppercase"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
