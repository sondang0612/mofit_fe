"use client";

import { useCart } from "@/hooks/react-query/cart/useCart";
import { useRemoveCartItem } from "@/hooks/react-query/cart-items/useRemoveCartItem";
import Link from "next/link";
import ListCartItems from "./ListCartItems";
import { pathNames } from "@/utils/constants/paths";

export default function Cart() {
  const { data: cart } = useCart();
  const { mutate: removeCartItem } = useRemoveCartItem();

  return (
    <div className="shopping-cart" style={{ minHeight: "calc(100vh - 300px)" }}>
      <div className="cart-table__wrapper">
        {cart?.length ? (
          <>
            <ListCartItems
              data={cart}
              onRemove={(cartItemId) => removeCartItem({ cartItemId })}
            />
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
              <Link href={pathNames.STORE}>Shopping now!</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
