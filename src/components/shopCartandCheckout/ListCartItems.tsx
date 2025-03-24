import { CartItem } from "@/types/api";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { formatPrice } from "@/utils/formatPrice";
import { getTotalPrice } from "@/utils/getTotalPrice";
import Image from "next/image";
import React from "react";

interface Props {
  data?: CartItem[] | undefined;
  canEdit?: boolean;
  onRemove?: (id?: number) => void;
}

const ListCartItems = (props: Props) => {
  const { data, canEdit = true, onRemove } = props;
  return (
    <table className="cart-table w-full">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th></th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th>Tạm tính</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((elm, i) => (
          <tr key={i}>
            <td>
              <div className="shopping-cart__product-item">
                <Image
                  loading="lazy"
                  src={elm?.product?.imgSrc || EDefaultValue.IMAGE}
                  width="120"
                  height="120"
                  alt="image"
                />
              </div>
            </td>
            <td>
              <div className="shopping-cart__product-item__detail">
                <h4>{elm?.product?.title}</h4>
                <ul className="shopping-cart__product-item__options">
                  <li>Loại: {elm?.product?.category?.name}</li>
                  <li>Mã: {elm?.product?.id}</li>
                </ul>
              </div>
            </td>
            <td>
              <span className="shopping-cart__product-price">
                {formatPrice(elm?.product?.price)}
              </span>
            </td>
            <td>
              {canEdit ? (
                <div className="qty-control position-relative">
                  <input
                    type="number"
                    name="quantity"
                    value={elm.quantity}
                    min={1}
                    className="qty-control__number text-center"
                  />
                  <div className="qty-control__reduce">-</div>
                  <div className="qty-control__increase">+</div>
                </div>
              ) : (
                <span className="shopping-cart__product-price">
                  {elm.quantity}
                </span>
              )}
            </td>
            <td>
              <span className="shopping-cart__subtotal">
                {formatPrice(getTotalPrice(elm?.product?.price, elm?.quantity))}
              </span>
            </td>
            {onRemove && canEdit && (
              <td>
                <a className="remove-cart" onClick={() => onRemove(elm?.id)}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="#767676"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0.259435 8.85506L9.11449 0L10 0.885506L1.14494 9.74056L0.259435 8.85506Z" />
                    <path d="M0.885506 0.0889838L9.74057 8.94404L8.85506 9.82955L0 0.97449L0.885506 0.0889838Z" />
                  </svg>
                </a>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListCartItems;
