"use client";
import { useProfile } from "@/hooks/react-query/auth/useProfile";
import { useUpdateProfile } from "@/hooks/react-query/auth/useUpdateProfile";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function EditAccount() {
  const { data: profile } = useProfile();
  const { register, reset, handleSubmit } = useForm<Form>({
    defaultValues,
  });
  const { mutate: updateProfile } = useUpdateProfile();

  const checkValidPassword = (data: Form) => {
    const { newPassword, confirmNewPassword, currentPassword } = data;

    if (
      (currentPassword && currentPassword.length < 6) ||
      (newPassword && newPassword.length < 6) ||
      (confirmNewPassword && confirmNewPassword.length < 6)
    ) {
      toast.error("Mật khẩu phải lớn hơn 6 kí tự");

      return false;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Mật khẩu mới chưa trùng khớp");
      return false;
    }

    return true;
  };
  const onSubmit = (data: Form) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      delete data.confirmNewPassword;
      delete data.currentPassword;
      delete data.newPassword;
      updateProfile(data);
      return undefined;
    }

    const isValidPassword = checkValidPassword(data);

    if (isValidPassword) {
      updateProfile(data);
    }
  };

  React.useEffect(() => {
    if (profile) {
      reset(profile);
    } else {
      reset();
    }
  }, [profile]);

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__edit">
        <p className="notice">Thông tin tài khoản</p>
        <div className="my-account__edit-form">
          <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
            <div className="row">
              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="account_first_name"
                    placeholder="First Name"
                    required
                    {...register("firstName")}
                  />
                  <label htmlFor="account_first_name">Họ</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating my-3">
                  <input
                    type="text"
                    className="form-control"
                    id="account_last_name"
                    placeholder="Last Name"
                    required
                    {...register("lastName")}
                  />
                  <label htmlFor="account_last_name">Tên</label>
                </div>
              </div>
              <div className="col-md-12 opacity-50">
                <div className="form-floating my-3">
                  <input
                    type="email"
                    className="form-control"
                    id="account_email"
                    placeholder="Email Address"
                    required
                    disabled
                    {...register("email")}
                  />
                  <label htmlFor="account_email" className="bg-white">
                    Email
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="tel"
                    className="form-control"
                    id="phone_number"
                    placeholder="Số điện thoại"
                    required
                    {...register("phoneNumber")}
                  />
                  <label htmlFor="phone_number">Số điện thoại</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="my-3">
                  <h5 className="text-uppercase mb-0">Đổi mật khẩu</h5>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="account_current_password"
                    placeholder="Current password"
                    {...register("currentPassword")}
                  />
                  <label htmlFor="account_current_password">
                    Mật khẩu hiện tại
                  </label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    id="account_new_password"
                    placeholder="New password"
                    {...register("newPassword")}
                  />
                  <label htmlFor="account_new_password">Mật khẩu mới</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating my-3">
                  <input
                    type="password"
                    className="form-control"
                    data-cf-pwd="#account_new_password"
                    id="account_confirm_password"
                    placeholder="Confirm new password"
                    {...register("confirmNewPassword")}
                  />
                  <label htmlFor="account_confirm_password">
                    Xác thực mật khẩu mới
                  </label>
                  <div className="invalid-feedback">
                    Passwords did not match!
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="my-3">
                  <button className="btn btn-primary">Lưu thay đổi</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
