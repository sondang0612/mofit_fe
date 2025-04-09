"use client";

import { useOrderByTxnRef } from "@/hooks/react-query/orders/useOrderByTxnRef";
import { QueryParam, useFetch } from "@/hooks/react-query/useFetch";
import { useUrlParams } from "@/hooks/useUrlParams";
import { Order } from "@/types/api";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import {
  EVnpayResponseCode,
  EVnpayTransactionNo,
  EVnpayTransactionStatus,
} from "@/utils/constants/vnpay.enum";
import { formatPrice } from "@/utils/formatPrice";
import { useRouter } from "next/navigation";
import React from "react";

const paymentMethodTxt = {
  payment_gateway: "Chuyển khoản ngân hàng",
  cod: "Thanh toán tiến mặt",
};

export default function OrderCompleted() {
  const { getParam } = useUrlParams();
  const txnRef = getParam("vnp_TxnRef");
  const transactionStatus = getParam("vnp_TransactionStatus");
  const responseCode = getParam("vnp_ResponseCode");
  const transactionNo = getParam("vnp_TransactionNo");
  const orderId = getParam("orderId");

  const {
    data: orders,
    isSuccess: isSuccessOrder,
    isLoading,
  } = useFetch<Order>({
    endpoint: apiEndpoints.ORDERS,
    limit: 1,
    queryParams: [QueryParam.ID, QueryParam.TXN_REF],
    queryValues: [orderId, txnRef],
    enabled:
      (!!txnRef && !!transactionNo && !!responseCode && !!transactionStatus) ||
      !!orderId,
  });

  const isSuccess = React.useMemo(() => {
    return (
      (transactionStatus === EVnpayTransactionStatus.SUCCESS &&
        responseCode === EVnpayResponseCode.SUCCESS &&
        transactionNo !== EVnpayTransactionNo.FAIL) ||
      isSuccessOrder
    );
  }, [
    (transactionStatus === EVnpayTransactionStatus.SUCCESS &&
      responseCode === EVnpayResponseCode.SUCCESS &&
      transactionNo !== EVnpayTransactionNo.FAIL) ||
      isSuccessOrder,
  ]);

  if (!txnRef && !orderId) {
    return <div>Shop now</div>;
  }

  const order = orders[0];

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="order-complete">
      <div className="order-complete__message">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="40" cy="40" r="40" fill="#B9A16B" />
          <path
            d="M52.9743 35.7612C52.9743 35.3426 52.8069 34.9241 52.5056 34.6228L50.2288 32.346C49.9275 32.0446 49.5089 31.8772 49.0904 31.8772C48.6719 31.8772 48.2533 32.0446 47.952 32.346L36.9699 43.3449L32.048 38.4062C31.7467 38.1049 31.3281 37.9375 30.9096 37.9375C30.4911 37.9375 30.0725 38.1049 29.7712 38.4062L27.4944 40.683C27.1931 40.9844 27.0257 41.4029 27.0257 41.8214C27.0257 42.24 27.1931 42.6585 27.4944 42.9598L33.5547 49.0201L35.8315 51.2969C36.1328 51.5982 36.5513 51.7656 36.9699 51.7656C37.3884 51.7656 37.8069 51.5982 38.1083 51.2969L40.385 49.0201L52.5056 36.8996C52.8069 36.5982 52.9743 36.1797 52.9743 35.7612Z"
            fill="white"
          />
        </svg>
        <h3>{isSuccess ? "Đặt hàng thành công!" : "Đặt hàng thất bại!"}</h3>
        {isSuccess && <p>Đơn hàng của bạn đang được xử lý.</p>}
      </div>
      {isSuccess && (
        <>
          <div className="order-info">
            <div className="order-info__item">
              <label>Mã đơn hàng</label>
              <span>{order?.id}</span>
            </div>
            <div className="order-info__item">
              <label>Ngày tạo</label>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="order-info__item">
              <label>Tổng tiền</label>

              <span>{formatPrice(order?.totalPrice)}</span>
            </div>
            <div className="order-info__item">
              <label>Phương thức thanh toán</label>
              <span>
                {
                  paymentMethodTxt[
                    order?.paymentMethod as "payment_gateway" | "cod"
                  ]
                }
              </span>
            </div>
          </div>
          <div className="checkout__totals-wrapper">
            <div className="checkout__totals">
              <h3>Chi tiết đơn hàng</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Ước tính</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems?.map((elm, i) => (
                    <tr key={i}>
                      <td>
                        {elm?.product?.title} x {elm?.quantity}
                      </td>
                      <td>{formatPrice(elm?.product?.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <table className="checkout-totals">
                <tbody>
                  <tr>
                    <th>Tạm tính</th>
                    <td>{formatPrice(order?.subTotal)}</td>
                  </tr>
                  <tr>
                    <th>Vận chuyển</th>
                    <td>Free shipping</td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>{formatPrice(order?.vat)}đ</td>
                  </tr>
                  <tr>
                    <th>Tổng</th>
                    <td>{formatPrice(order?.totalPrice)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
