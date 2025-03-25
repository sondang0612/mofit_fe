"use client";
import { useCreateContact } from "@/hooks/react-query/contacts/useCreateContact";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  name?: string;
  email?: string;
  message?: string;
};

const defaultValues = {
  name: "",
  email: "",
  message: "",
};

const ContactForm = () => {
  const { handleSubmit, register, reset } = useForm<Form>({ defaultValues });
  const { mutate: createContact, isSuccess } = useCreateContact();

  const checkValid = (data: Form) => {
    if (data?.name && data?.name?.length < 3) {
      toast.error("Tên phải dài hơn 3 kí tự!!");
      return false;
    }

    return true;
  };

  const onSubmit = (data: Form) => {
    const isValid = checkValid(data);

    if (isValid) {
      createContact(data);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <div className="col-lg-6">
      <h2 className="mb-4">Biểu mẫu liên hệ</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Tên *
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                {...register("name")}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                {...register("email")}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label">
                Tin nhắn
              </label>
              <textarea
                className="form-control"
                id="message"
                rows={6}
                {...register("message")}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Gửi <i className="bi bi-send ms-2"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
