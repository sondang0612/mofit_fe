"use client";

import { useAddresses } from "@/hooks/react-query/addresses/useAddresses";
import { useCart } from "@/hooks/react-query/cart/useCart";
import { useCreateOrder } from "@/hooks/react-query/orders/useCreateOrder";
import { EPaymentMethod, EShippingMethod } from "@/utils/constants/order.enum";
import { formatPrice } from "@/utils/formatPrice";
import { getSubTotal } from "@/utils/getSubTotal";
import { getTotal } from "@/utils/getTotal";
import { getTotalPrice } from "@/utils/getTotalPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
import Address from "../otherPages/address/Address";
import CartWithoutDiscount from "./CartWithoutDiscount";
import { useFetch } from "@/hooks/react-query/useFetch";
import { Address as IAddress } from "@/types/api";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";

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
  const router = useRouter();

  const { data: cart } = useCart();
  const { data: addresses } = useFetch<IAddress>({
    page: 1,
    endpoint: apiEndpoints.ADDRESSES,
    limit: 1,
  });
  const { mutate: createOrder } = useCreateOrder();

  const [paymentMethod, setPaymentMethod] = React.useState<EPaymentMethod>(
    EPaymentMethod.PAYMENT_GATEWAY
  );

  const subTotal = React.useMemo(() => {
    return getSubTotal(cart);
  }, [cart]);

  const checkValid = () => {
    if (addresses?.length === 0 || !addresses) {
      toast.error("Vui lòng chọn địa chỉ nhận hàng");
      return false;
    }

    if (cart?.length === 0 || !cart) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return false;
    }

    return true;
  };

  const handleCreateOrder = () => {
    const isValid = checkValid();

    if (!isValid) return;

    createOrder({
      addressId: addresses[0].id,
      cartItemIds: cart?.map((item) => item.id),
      discount: 0,
      vat: 0,
      paymentMethod,
      shippingMethod: EShippingMethod.OWN_DELIVERY,
      shippingPrice: 0,
      subTotal,
      totalPrice: getTotal(subTotal, 0, 0),
    });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="checkout-form">
        <div className="billing-info__wrapper">
          <h4>Chi tiết đơn hàng</h4>
          <CartWithoutDiscount cart={cart || []} />
        </div>
        <div className="checkout__totals-wrapper">
          <div className="sticky-content">
            <div className="checkout__totals">
              <h3>Đơn hàng của bạn</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {cart?.map((elm, i) => (
                    <tr key={i}>
                      <td style={{ width: "65%" }}>
                        {elm.product?.title} x {elm.quantity}
                      </td>
                      <td>
                        {formatPrice(
                          getTotalPrice(elm?.product?.price, elm?.quantity)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>Tổng phụ</th>
                    <td>{formatPrice(subTotal)}</td>
                  </tr>
                  <tr>
                    <th>Vận chuyển</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>{formatPrice(0)}</td>
                  </tr>
                  <tr>
                    <th>Tổng tiền</th>
                    <td>{formatPrice(getTotal(subTotal, 0, 0))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout__totals">
              {addresses && addresses?.length > 0 && (
                <Address data={addresses[0]} />
              )}
              <span
                className="underline cursor-pointer text-blue-500"
                onClick={() => router.push("/account_edit_address")}
              >
                {addresses && addresses?.length > 0
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
