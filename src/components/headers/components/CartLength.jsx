"use client";

import { useCart } from "@/hooks/react-query/cart/useCart";

export default function CartLength() {
  const { data: cart } = useCart();
  return <>{cart?.length || 0}</>;
}
