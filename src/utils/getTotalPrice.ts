export const getTotalPrice = (price?: number, quantity?: number) => {
  if (!price || !quantity) return 0;

  return price * quantity;
};
