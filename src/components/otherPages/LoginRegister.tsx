"use client";
import { useLogin } from "@/hooks/react-query/auth/useLogin";
import { useRegister } from "@/hooks/react-query/auth/useRegister";
import { useUrlParams } from "@/hooks/useUrlParams";
import { ERole } from "@/utils/constants/role.enum";
import Link from "next/link";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export default function LoginRegister() {
  const { getParam, setParams } = useUrlParams();
  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();

  const isRegister = getParam("isRegister");
  const {
    formState: { errors },
    register: registerForm,
    handleSubmit,
  } = useForm<Form>({ defaultValues });

  const open = (formType: "register" | "login") => {
    if (formType === "register") {
      setParams([{ key: "isRegister", value: true }]);
    } else {
      setParams([{ key: "isRegister", value: false }]);
    }
  };

  const checkValid = (data: Form) => {
    if (isRegister === "true") {
      if (data?.password !== data?.confirmPassword) {
        toast.error("Mật khẩu không trùng khớp");
        return false;
      }

      if (data?.confirmPassword && data?.confirmPassword.length < 6) {
        toast.error("Mật khẩu phải hơn 6 kí tự");
        return false;
      }
    }
    if (data?.password && data?.password.length < 6) {
      toast.error("Mật khẩu phải hơn 6 kí tự");
      return false;
    }
    return true;
  };

  const onSubmit = (data: Form) => {
    const isValid = checkValid(data);
    if (!isValid) {
      return;
    }

    if (isRegister === "true") {
      const form = { ...data, username: data?.email?.split("@")[0] };
      register(form);
    } else {
      login({
        username: data?.email,
        password: data?.password,
        role: ERole.USER,
      });
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
                onSubmit={handleSubmit(onSubmit)}
                className="needs-validation"
                style={{ minHeight: 500 }}
              >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control form-control_gray"
                    placeholder="Email address *"
                    required
                    {...registerForm("email")}
                  />
                  <label>Email *</label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control form-control_gray"
                    id="customerPasswodInput"
                    placeholder="Password *"
                    required
                    {...registerForm("password")}
                  />
                  <label htmlFor="customerPasswodInput">Mật khẩu *</label>
                </div>

                <div className="d-flex align-items-center mb-3 pb-2">
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
                onSubmit={handleSubmit(onSubmit)}
                className="needs-validation"
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameRegisterInput"
                        placeholder="Họ"
                        required
                        {...registerForm("firstName")}
                      />
                      <label htmlFor="customerNameRegisterInput">Họ</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control form-control_gray"
                        id="customerNameRegisterInput"
                        placeholder="Tên"
                        required
                        {...registerForm("lastName")}
                      />
                      <label htmlFor="customerNameRegisterInput">Tên</label>
                    </div>
                  </div>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control form-control_gray"
                    id="customerEmailRegisterInput"
                    placeholder="Email address *"
                    required
                    {...registerForm("email")}
                  />
                  <label htmlFor="customerEmailRegisterInput">Email *</label>
                </div>
                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    className={`form-control form-control_gray ${
                      errors.phoneNumber ? "is-invalid" : ""
                    }`}
                    id="customerEmailRegisterInput"
                    placeholder="Số điện thoại *"
                    required
                    {...registerForm("phoneNumber", {
                      pattern: {
                        value: /^[0-9]{10,11}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                  />
                  <label
                    htmlFor="customerEmailRegisterInput"
                    style={{
                      color: errors?.phoneNumber?.message ? "#dc3545" : "#000",
                    }}
                  >
                    {errors?.phoneNumber?.message || "Số điện thoại *"}
                  </label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control form-control_gray"
                    id="customerPasswodRegisterInput"
                    placeholder="Password *"
                    required
                    {...registerForm("password")}
                  />
                  <label htmlFor="customerPasswodRegisterInput">
                    Mật khẩu *
                  </label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control form-control_gray"
                    id="customerPasswodRegisterInput"
                    placeholder="Password *"
                    required
                    {...registerForm("confirmPassword")}
                  />
                  <label htmlFor="customerPasswodRegisterInput">
                    Nhập lại mật khẩu *
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
