import { useCreateAddress } from "@/hooks/react-query/addresses/useCreateAddress";
import { isValidPhoneNumber } from "@/utils/isValidPhoneNumber";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Form = {
  firstName: string;
  lastName: string;
  city: string;
  district: string;
  streetAddress: string;
  note?: string | undefined;
  phoneNumber: string;
  isDefault: boolean;
};

const defaultValues: Form = {
  firstName: "",
  lastName: "",
  city: "",
  district: "",
  streetAddress: "",
  note: "",
  phoneNumber: "",
  isDefault: true,
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddressModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const { register, handleSubmit, reset } = useForm<Form>({ defaultValues });
  const { mutate: createAddress, isSuccess } = useCreateAddress();

  const ref = React.useRef<HTMLDivElement | null>(null);

  const checkValid = (data: Form) => {
    const { phoneNumber } = data;
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ");
      return false;
    }

    return true;
  };

  const onSubmit = (data: Form) => {
    const isValid = checkValid(data);

    if (!isValid) return;

    createAddress(data);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  React.useEffect(() => {
    if (isSuccess) {
      reset();
      onClose();
    }
  }, [isSuccess]);

  return (
    <div className="address-modal-component">
      <div className={`modal ${isOpen ? "is-active" : ""}`}>
        <div className="modal__container slide-up" ref={ref}>
          <div className="modal__header">
            <h3>Thêm địa chỉ mới</h3>
            <button className="modal__close" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="modal__body">
            <form
              className="form"
              id="address-modal"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form__grid">
                <div className="form__group">
                  <label className="form__label">Họ</label>
                  <input
                    type="text"
                    className="form__input"
                    required
                    {...register("firstName")}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Tên</label>
                  <input
                    type="text"
                    className="form__input"
                    required
                    {...register("lastName")}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Số điện thoại</label>
                  <input
                    type="tel"
                    className="form__input"
                    required
                    {...register("phoneNumber")}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Tỉnh/Thành phố</label>
                  <input
                    type="text"
                    className="form__input"
                    required
                    {...register("city")}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Quận/Huyện</label>
                  <input
                    type="text"
                    className="form__input"
                    required
                    {...register("district")}
                  />
                </div>
                <div className="form__group">
                  <label className="form__label">Địa chỉ cụ thể</label>
                  <input
                    type="text"
                    className="form__input"
                    required
                    {...register("streetAddress")}
                  />
                </div>
              </div>
              <div className="form__group">
                <label className="form__label">Ghi chú</label>
                <textarea
                  className="form__input resize-none"
                  {...register("note")}
                />
              </div>

              <div className="form__group">
                <label className="form__checkbox">
                  <input type="checkbox" {...register("isDefault")} />
                  <span>Đặt làm địa chỉ mặc định</span>
                </label>
              </div>

              <div className="modal__footer">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn--secondary btn--md"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="btn btn--primary btn--md"
                  form="address-modal"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
