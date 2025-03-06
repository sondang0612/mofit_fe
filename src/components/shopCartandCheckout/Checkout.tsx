"use client";
const countries = [
  "Australia",
  "Canada",
  "United Kingdom",
  "United States",
  "Turkey",
];
import { useCart } from "@/hooks/react-query/cart/useCart";
import { getSubTotal } from "@/utils/getSubTotal";
import { getTotal } from "@/utils/getTotal";
import { getTotalPrice } from "@/utils/getTotalPrice";
import Link from "next/link";
import ListCartItems from "./ListCartItems";
import React from "react";
import { useAddresses } from "@/hooks/react-query/addresses/useAddresses";
import Address from "../otherPages/address/Address";
import { useRouter } from "next/navigation";
export default function Checkout() {
  const { data: cart } = useCart();
  const { data: addresses } = useAddresses();
  const router = useRouter();

  const subTotal = React.useMemo(() => {
    return getSubTotal(cart?.data);
  }, [cart?.data]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="checkout-form">
        <div className="billing-info__wrapper">
          <h4>Chi tiết đơn hàng</h4>
          <ListCartItems data={cart?.data} canEdit={false} />
        </div>
        <div className="checkout__totals-wrapper">
          <div className="sticky-content">
            <div className="checkout__totals">
              <h3>Đơn hàng của bạn</h3>
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
                    <th>Tổng phụ</th>
                    <td>${subTotal}</td>
                  </tr>
                  <tr>
                    <th>Vận chuyển</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>${0}</td>
                  </tr>
                  <tr>
                    <th>Tổng tiền</th>
                    <td>${getTotal(subTotal, 0, 0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout__totals">
              <Address data={addresses?.data[0]} />
              <span
                className="underline cursor-pointer text-blue-500"
                onClick={() => router.push("/account_edit_address")}
              >
                Đặt lại địa chỉ mặc định
              </span>
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
                described in our{" "}
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
