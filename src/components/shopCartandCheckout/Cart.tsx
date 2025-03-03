"use client";

import { useCart } from "@/hooks/react-query/cart/useCart";
import { useRemoveCartItems } from "@/hooks/react-query/users/useRemoveCartItems";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { getTotalPrice } from "@/utils/getTotalPrice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  const { data: cart } = useCart();
  const { mutate: removeCartItems } = useRemoveCartItems();

  const [checkboxes, setCheckboxes] = useState<any>({
    free_shipping: false,
    flat_rate: false,
    local_pickup: false,
  });

  // Step 2: Create a handler function
  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckboxes((prevCheckboxes: any) => ({
      ...prevCheckboxes,
      [id]: checked,
    }));
  };
  return (
    <div className="shopping-cart" style={{ minHeight: "calc(100vh - 300px)" }}>
      <div className="cart-table__wrapper">
        {cart?.data?.length ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th></th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng phụ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart?.data?.map((elm, i) => (
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
                          <li>Color: Yellow</li>
                          <li>Size: L</li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <span className="shopping-cart__product-price">
                        ${elm?.product?.price}
                      </span>
                    </td>
                    <td>
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
                    </td>
                    <td>
                      <span className="shopping-cart__subtotal">
                        ${getTotalPrice(elm?.product?.price, elm?.quantity)}
                      </span>
                    </td>
                    <td>
                      <a
                        className="remove-cart"
                        onClick={() =>
                          removeCartItems({ cartItemIds: [elm?.id] })
                        }
                      >
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-table-footer">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="position-relative bg-body"
              >
                <input
                  className="form-control"
                  type="text"
                  name="coupon_code"
                  placeholder="Mã thánh toán"
                />
                <input
                  className="btn-link fw-medium position-absolute top-0 end-0 h-100 px-4"
                  type="submit"
                  defaultValue="Áp dụng"
                />
              </form>
              <button className="btn btn-light">
                <Link href={"/shop_checkout"}>Tiếp theo</Link>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="fs-20">Giò hàng đang trống</div>

            <button className="btn mt-3 btn-light">
              <Link href={"/shop-1"}>Shopping now!</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
