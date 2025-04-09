"use client";
import Link from "next/link";

import { useCart } from "@/hooks/react-query/cart/useCart";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { getTotalPrice } from "@/utils/getTotalPrice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRemoveCartItem } from "@/hooks/react-query/cart-items/useRemoveCartItem";
import { formatPrice } from "@/utils/formatPrice";
import { pathNames } from "@/utils/constants/paths";

export default function CartDrawer() {
  const { data: cart } = useCart();
  const { mutate: removeCartItem } = useRemoveCartItem();
  const router = useRouter();
  const pathname = usePathname();
  const closeCart = () => {
    document
      ?.getElementById("cartDrawerOverlay")
      ?.classList.remove("page-overlay_visible");
    document?.getElementById("cartDrawer")?.classList.remove("aside_visible");
  };

  const handleShopNow = () => {
    const href = pathNames.STORE;
    if (pathname === href) {
      closeCart();
    } else {
      router.push(href);
    }
  };

  const subTotal = React.useMemo(() => {
    return cart?.reduce((prev, cur) => {
      const curQuantity = cur?.quantity || 0;
      const curPrice = cur?.product?.price || 0;
      return prev + curQuantity * curPrice;
    }, 0);
  }, [cart]);

  useEffect(() => {
    closeCart();
  }, [pathname]);

  return (
    <>
      <div
        className="aside aside_right overflow-hidden cart-drawer "
        id="cartDrawer"
      >
        <div className="aside-header d-flex align-items-center">
          <h3 className="text-uppercase fs-6 mb-0">
            Giỏ hàng (
            <span className="cart-amount js-cart-items-count">
              {cart?.length}
            </span>
            )
          </h3>
          <button
            onClick={closeCart}
            className="btn-close-lg js-close-aside btn-close-aside ms-auto"
          ></button>
        </div>
        {cart?.length ? (
          <div className="aside-content cart-drawer-items-list">
            {cart?.map((elm, i) => (
              <React.Fragment key={i}>
                <div className="cart-drawer-item d-flex position-relative">
                  <div className="position-relative">
                    <Image
                      loading="lazy"
                      className="cart-drawer-item__img"
                      width={330}
                      height={400}
                      style={{ height: "fit-content" }}
                      src={elm?.product?.imgSrc || EDefaultValue.IMAGE}
                      alt="image"
                    />
                  </div>
                  <div className="cart-drawer-item__info flex-grow-1">
                    <h6 className="cart-drawer-item__title fw-normal">
                      {elm?.product?.title}
                    </h6>
                    <p className="cart-drawer-item__option text-secondary">
                      Loại: {elm?.product?.category?.name}
                    </p>
                    <p className="cart-drawer-item__option text-secondary">
                      Mã: {elm?.product?.id}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <div className="qty-control position-relative">
                        <input
                          type="number"
                          name="quantity"
                          value={elm.quantity}
                          onChange={(e) => console.log(e.target.value)}
                          min="1"
                          className="qty-control__number border-0 text-center"
                        />
                        <div className="qty-control__reduce text-start">-</div>
                        <div className="qty-control__increase text-end">+</div>
                      </div>

                      <span className="cart-drawer-item__price money price">
                        {formatPrice(
                          getTotalPrice(elm?.product?.price, elm?.quantity)
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn-close-xs position-absolute top-0 end-0 js-cart-item-remove"
                    onClick={() => removeCartItem({ cartItemId: elm?.id })}
                  ></button>
                </div>
                {/* <!-- /.cart-drawer-item d-flex --> */}

                <hr className="cart-drawer-divider" />
              </React.Fragment>
            ))}

            {/* <!-- /.cart-drawer-item d-flex --> */}
          </div>
        ) : (
          <div className="fs-18 mt-5 px-5 text-center">
            Chưa có sản phẩm trong giỏ hàng.{" "}
            <span
              className="underline cursor-pointer text-blue-500"
              onClick={handleShopNow}
            >
              Shopping now!
            </span>
          </div>
        )}
        {/* <!-- /.aside-content --> */}

        <div className="cart-drawer-actions position-absolute start-0 bottom-0 w-100">
          <hr className="cart-drawer-divider" />
          <div className="d-flex justify-content-between">
            <h6 className="fs-base fw-medium">Tạm tính:</h6>
            <span className="cart-subtotal fw-medium">
              ${formatPrice(subTotal)}
            </span>
          </div>
          {/* <!-- /.d-flex justify-content-between --> */}
          {cart?.length ? (
            <>
              <Link href="/shop_cart" className="btn btn-light mt-3 d-block">
                Xem giỏ hàng
              </Link>
              <Link
                href="/shop_checkout"
                className="btn btn-primary mt-3 d-block"
              >
                Thanh toán
              </Link>
            </>
          ) : (
            <Link href={pathNames.STORE} className="btn btn-light mt-3 d-block">
              Explore shop
            </Link>
          )}
        </div>
        {/* <!-- /.aside-content --> */}
      </div>
      <div
        id="cartDrawerOverlay"
        onClick={closeCart}
        className="page-overlay"
      ></div>
    </>
  );
}
