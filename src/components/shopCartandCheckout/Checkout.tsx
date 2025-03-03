"use client";
const countries = [
  "Australia",
  "Canada",
  "United Kingdom",
  "United States",
  "Turkey",
];
import { useContextElement } from "@/context/Context";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/react-query/cart/useCart";
import { getTotalPrice } from "@/utils/getTotalPrice";
export default function Checkout() {
  const { totalPrice } = useContextElement();
  const { data: cart } = useCart();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [idDDActive, setIdDDActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="checkout-form">
        <div className="billing-info__wrapper">
          <h4>Chi tiết đơn hàng</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_first_name"
                  placeholder="First Name"
                />
                <label htmlFor="checkout_first_name">Họ</label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_last_name"
                  placeholder="Last Name"
                />
                <label htmlFor="checkout_last_name">Tên</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_city"
                  placeholder="Town / City *"
                  required
                />
                <label htmlFor="checkout_city">Thành phố *</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_district"
                  placeholder="District *"
                />
                <label htmlFor="checkout_district">Quận *</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating mt-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_street_address"
                  placeholder="Street Address *"
                  required
                />
                <label htmlFor="checkout_company_name">Địa chỉ *</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-floating my-3">
                <input
                  type="text"
                  className="form-control"
                  id="checkout_phone"
                  placeholder="Phone *"
                />
                <label htmlFor="checkout_phone">Số điện thoại *</label>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="mt-3">
              <textarea
                className="form-control form-control_gray"
                placeholder="Ghi chú"
                cols={30}
                rows={8}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="checkout__totals-wrapper">
          <div className="sticky-content">
            <div className="checkout__totals">
              <h3>Đon hàng của bạn</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.data?.map((elm, i) => (
                    <tr key={i}>
                      <td>
                        {elm.product?.title} x {elm.quantity}
                      </td>
                      <td>
                        ${getTotalPrice(elm?.product?.price, elm?.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>SUBTOTAL</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>SHIPPING</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>${totalPrice && 19}</td>
                  </tr>
                  <tr>
                    <th>TOTAL</th>
                    <td>${totalPrice && totalPrice + 19}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout__payment-methods">
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_1"
                  defaultChecked
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_1"
                >
                  Direct bank transfer
                  <span className="option-detail d-block">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference.Your order will not
                    be shipped until the funds have cleared in our account.
                  </span>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_2"
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_2"
                >
                  Check payments
                  <span className="option-detail d-block">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_3"
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_3"
                >
                  Cash on delivery
                  <span className="option-detail d-block">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input form-check-input_fill"
                  type="radio"
                  name="checkout_payment_method"
                  id="checkout_payment_method_4"
                />
                <label
                  className="form-check-label"
                  htmlFor="checkout_payment_method_4"
                >
                  Paypal
                  <span className="option-detail d-block">
                    Phasellus sed volutpat orci. Fusce eget lore mauris vehicula
                    elementum gravida nec dui. Aenean aliquam varius ipsum, non
                    ultricies tellus sodales eu. Donec dignissim viverra nunc,
                    ut aliquet magna posuere eget.
                  </span>
                </label>
              </div>
              <div className="policy-text">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our
                <Link href="/terms" target="_blank">
                  privacy policy
                </Link>
                .
              </div>
            </div>
            <button className="btn btn-primary btn-checkout">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
