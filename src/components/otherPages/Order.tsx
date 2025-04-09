import { Order as IOrder } from "@/types/api";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";

interface Props {
  data?: IOrder;
}

const Order = (props: Props) => {
  const { data } = props;

  const orderItems = React.useMemo(() => {
    return data?.orderItems || undefined;
  }, [data?.orderItems]);

  return (
    <div className="wrapper">
      <div className="d-flex gap-2">
        <Image
          width={80}
          height={80}
          src={
            orderItems
              ? `${orderItems[0].product?.imgSrc}`
              : EDefaultValue.IMAGE
          }
          alt=""
        />
        <div>
          <div className="title">
            {orderItems ? orderItems[0].product?.title : "Tên sản phẩm"}
          </div>
          <div className="description">Trạng thái: {data?.status}</div>
        </div>
      </div>
      <div className="price">{formatPrice(data?.totalPrice)}</div>
    </div>
  );
};

export default Order;
