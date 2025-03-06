import { CartItem } from "@/types/api";

const getSubTotal = (data?: CartItem[]) => {
  if (!data || data.length === 0) return 0;

  return data.reduce(
    (prev, cur) => prev + (cur?.quantity || 1) * (cur?.product?.price || 1),
    0
  );
};

export { getSubTotal };
