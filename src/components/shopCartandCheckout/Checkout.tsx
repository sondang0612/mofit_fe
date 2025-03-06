"use client";

import { useCart } from "@/hooks/react-query/cart/useCart";
import { getSubTotal } from "@/utils/getSubTotal";
import { getTotal } from "@/utils/getTotal";
import { getTotalPrice } from "@/utils/getTotalPrice";
import Link from "next/link";
import ListCartItems from "./ListCartItems";
import React from "react";
import { useAddresses } from "@/hooks/react-query/addresses/useAddresses";
import Address from "../otherPages/address/Address";
import { useCreateOrder } from "@/hooks/react-query/orders/useCreateOrder";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { data: cart } = useCart();
  const { data: addresses } = useAddresses();
  const { mutate: createOrder, isSuccess, data: order } = useCreateOrder();
  const router = useRouter();

  const subTotal = React.useMemo(() => {
    return getSubTotal(cart?.data);
  }, [cart?.data]);

  const checkValid = () => {
    if (addresses?.data?.length === 0 || !addresses?.data) {
      toast.error("Vui lòng chọn địa chỉ nhận hàng");
      return false;
    }

    if (cart?.data?.length === 0 || !cart?.data) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return false;
    }

    return true;
  };

  const handleCreateOrder = () => {
    const isValid = checkValid();

    if (!isValid) return;

    createOrder({
      addressId: addresses?.data[0].id,
      cartItemIds: cart?.data?.map((item) => item.id),
      discount: 0,
      vat: 0,
      paymentMethod: "COD",
      shippingMethod: "OWN_DELIVERY",
      shippingPrice: 0,
      subTotal,
      totalPrice: getTotal(subTotal, 0, 0),
    });
  };

  React.useEffect(() => {
    if (isSuccess && order) {
      sessionStorage.setItem("order", JSON.stringify(order?.data));
      console.log(order?.data);

      router.push("/shop_order_complete");
    }
  }, [isSuccess, router, order]);

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
              {addresses && addresses?.data?.length > 0 && (
                <Address data={addresses?.data[0]} />
              )}
              <span
                className="underline cursor-pointer text-blue-500"
                onClick={() => router.push("/account_edit_address")}
              >
                {addresses && addresses?.data?.length > 0
                  ? "Đặt lại địa chỉ mặc định"
                  : "Thêm địa chỉ giao hàng"}
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
            <button
              className="btn btn-primary btn-checkout"
              onClick={handleCreateOrder}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
