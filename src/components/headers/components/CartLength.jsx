"use client";

import { useCart } from "@/hooks/react-query/cart/useCart";

export default function CartLength() {
  const { data: cart } = useCart();
  return <>{cart?.data?.items?.length || 0}</>;
}
