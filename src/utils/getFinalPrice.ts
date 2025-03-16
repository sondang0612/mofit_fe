import { Discount } from "@/types/api";

const getFinalPrice = (price?: number, discount?: Discount) => {
  if (!price) return 0;
  if (!discount || !discount?.percentage) return price;

  return price - price * (discount?.percentage / 100);
};

export { getFinalPrice };
