export const getTotal = (
  subTotal?: number,
  vat?: number,
  shipping?: number
) => {
  return (subTotal || 0) - (vat || 0) - (shipping || 0);
};
