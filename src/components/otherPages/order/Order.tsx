import { Order as IOrder } from "@/types/api";

interface Props {
  data?: IOrder;
}

const Order = (props: Props) => {
  const { data } = props;
  return (
    <tr key={data?.id}>
      <td>#{data?.id}</td>
      <td>October 1, 2023</td>
      <td>${`${data?.totalPrice} cho ${data?.orderItems?.length} sản phẩm`}</td>
      <td>
        <button className="btn btn-primary">Xem thêm</button>
      </td>
    </tr>
  );
};

export default Order;
