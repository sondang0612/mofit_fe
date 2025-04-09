"use client";

import { CartItem } from "@/types/api";
import { pathNames } from "@/utils/constants/paths";
import Link from "next/link";
import ListCartItems from "./ListCartItems";
import { useRemoveCartItem } from "@/hooks/react-query/cart-items/useRemoveCartItem";

export default function CartWithoutDiscount({ cart }: { cart: CartItem[] }) {
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
