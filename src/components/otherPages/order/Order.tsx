import { Order as IOrder } from "@/types/api";
import { EOrderStatus } from "@/utils/constants/order.enum";
import React from "react";

interface Props {
  data?: IOrder;
}

export const orderStatusText = {
  pending: "Chờ xác nhận",
  processing: "",
  shipped: "Đang giao hàng",
  delivered: "Đã giao",
  canceled: "Huỷ đơn",
  returned: "Trả hàng",
};

const Order = (props: Props) => {
  const { data } = props;
  return (
    <tr key={data?.id}>
      <td>#{data?.id}</td>
      <td>October 1, 2023</td>
      <td>{orderStatusText[data?.orderStatus || EOrderStatus.PENDING]}</td>
      <td>${`${data?.totalPrice} cho ${data?.orderItems?.length} sản phẩm`}</td>
      <td>
        <button className="btn btn-primary">Xem thêm</button>
      </td>
    </tr>
  );
};

export default Order;
