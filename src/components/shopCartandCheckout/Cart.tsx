"use client";

import { useContextElement } from "@/context/Context";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/hooks/react-query/cart/useCart";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import { getTotalPrice } from "@/utils/getTotalPrice";
import { useRemoveCartItems } from "@/hooks/react-query/cart/useRemoveCartItems";

export default function Cart() {
  const { cartProducts, setCartProducts, totalPrice } = useContextElement();
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
        {cart?.data?.items?.length ? (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th></th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart?.data?.items?.map((elm, i) => (
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
                  placeholder="Coupon Code"
                />
                <input
                  className="btn-link fw-medium position-absolute top-0 end-0 h-100 px-4"
                  type="submit"
                  defaultValue="APPLY COUPON"
                />
              </form>
              <button className="btn btn-light">UPDATE CART</button>
            </div>
          </>
        ) : (
          <>
            <div className="fs-20">Shop cart is empty</div>

            <button className="btn mt-3 btn-light">
              <Link href={"/shop-1"}>Explore Products</Link>
            </button>
          </>
        )}
      </div>
      {cartProducts.length ? (
        <div className="shopping-cart__totals-wrapper">
          <div className="sticky-content">
            <div className="shopping-cart__totals">
              <h3>Cart Totals</h3>
              <table className="cart-totals">
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>${totalPrice}</td>
                  </tr>
                  <tr>
                    <th>Shipping</th>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input form-check-input_fill"
                          type="checkbox"
                          id="free_shipping"
                          checked={checkboxes.free_shipping}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="free_shipping"
                        >
                          Free shipping
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input form-check-input_fill"
                          type="checkbox"
                          id="flat_rate"
                          checked={checkboxes.flat_rate}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="flat_rate">
                          Flat rate: $49
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input form-check-input_fill"
                          type="checkbox"
                          id="local_pickup"
                          checked={checkboxes.local_pickup}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="local_pickup"
                        >
                          Local pickup: $8
                        </label>
                      </div>
                      <div>Shipping to AL.</div>
                      <div>
                        <a href="#" className="menu-link menu-link_us-s">
                          CHANGE ADDRESS
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>VAT</th>
                    <td>$19</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>
                      $
                      {49 * checkboxes?.flat_rate +
                        8 * checkboxes?.local_pickup +
                        totalPrice +
                        19}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mobile_fixed-btn_wrapper">
              <div className="button-wrapper container">
                <button className="btn btn-primary btn-checkout">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
