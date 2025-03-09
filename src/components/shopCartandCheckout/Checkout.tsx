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
import { useRouter, useSearchParams } from "next/navigation";
import { EPaymentMethod, EShippingMethod } from "@/utils/constants/order.enum";
import { useCreatePaymentTransaction } from "@/hooks/react-query/payment-gateway/useCreatePaymentTransaction";
import { useCreatePaymentTransactionOrder } from "@/hooks/react-query/payment-gateway/useCreatePaymentTransactionOrder";

const paymentMethods = [
  {
    id: "checkout_payment_method_1",
    value: EPaymentMethod.COD,
    label: "Thanh toán khi nhận hàng",
  },
  {
    id: "checkout_payment_method_2",
    value: EPaymentMethod.PAYMENT_GATEWAY,
    label: "Thanh toán bằng thẻ",
  },
];

export default function Checkout() {
  const { data: cart } = useCart();
  const { data: addresses } = useAddresses();
  const {
    mutate: createOrder,
    isSuccess: isCreateOrderSuccess,
    data: order,
  } = useCreateOrder();
  const { mutate: createPaymentTransaction } = useCreatePaymentTransaction();

  const [paymentMethod, setPaymentMethod] = React.useState<EPaymentMethod>(
    EPaymentMethod.PAYMENT_GATEWAY
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    mutate: createPaymentTransactionOrder,
    isSuccess: isCreatePaymentTransactionOrderSuccess,
    data: paymentTransactionOrder,
  } = useCreatePaymentTransactionOrder();

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

    if (paymentMethod === EPaymentMethod.COD) {
      createOrder({
        addressId: addresses?.data[0].id,
        cartItemIds: cart?.data?.map((item) => item.id),
        discount: 0,
        vat: 0,
        paymentMethod: EPaymentMethod.COD,
        shippingMethod: EShippingMethod.OWN_DELIVERY,
        shippingPrice: 0,
        subTotal,
        totalPrice: getTotal(subTotal, 0, 0),
      });
      return;
    }

    if (paymentMethod === EPaymentMethod.PAYMENT_GATEWAY) {
      createPaymentTransaction({
        orderInfo: "Hello World",
        totalPrice: getTotal(subTotal, 0, 0) * 24000,
      });
      return;
    }
  };

  const handleCreateOrderTransaction = () => {
    createPaymentTransactionOrder({
      query: Object.fromEntries(searchParams.entries()),
      addressId: addresses?.data[0].id,
      cartItemIds: cart?.data?.map((item) => item.id),
      discount: 0,
      vat: 0,
      paymentMethod: EPaymentMethod.PAYMENT_GATEWAY,
      shippingMethod: EShippingMethod.OWN_DELIVERY,
      shippingPrice: 0,
      subTotal,
      totalPrice: getTotal(subTotal, 0, 0) * 23000,
    });
  };

  React.useEffect(() => {
    if (isCreateOrderSuccess && order) {
      sessionStorage.setItem("order", JSON.stringify(order?.data));
      router.push("/shop_order_complete");
    }
  }, [isCreateOrderSuccess, order]);

  React.useEffect(() => {
    if (isCreatePaymentTransactionOrderSuccess && paymentTransactionOrder) {
      sessionStorage.setItem(
        "order",
        JSON.stringify(paymentTransactionOrder?.data)
      );
      router.push("/shop_order_complete");
    }
  }, [isCreatePaymentTransactionOrderSuccess, paymentTransactionOrder]);

  React.useEffect(() => {
    const queryString = new URLSearchParams(
      Object.fromEntries(searchParams.entries())
    ).toString();

    if (
      queryString &&
      queryString?.length > 0 &&
      cart &&
      cart?.data?.length > 0 &&
      addresses &&
      addresses?.data?.length > 0
    ) {
      handleCreateOrderTransaction();
    }
  }, [addresses, cart]);

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
              {paymentMethods.map((method) => (
                <div className="form-check" key={method.id}>
                  <input
                    className="form-check-input form-check-input_fill"
                    type="radio"
                    name="checkout_payment_method"
                    id={method.id}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                    aria-label={method.label}
                  />
                  <label className="form-check-label" htmlFor={method.id}>
                    {method.label}
                  </label>
                </div>
              ))}
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
              {paymentMethod === EPaymentMethod.COD ? "Đặt hàng" : "Thanh toán"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
