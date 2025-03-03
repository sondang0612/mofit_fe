"use client";

import { useCart } from "@/hooks/react-query/cart/useCart";

export default function CartLength() {
  const { data: cart } = useCart();
  return <>{cart?.data?.length || 0}</>;
}
