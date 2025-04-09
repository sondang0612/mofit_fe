import { Address } from "@/types/api";

const getFullAddress = (address?: Address) => {
  if (!address) return "";
  return `${address.district}, ${address.city}, ${address.streetAddress}`;
};

export { getFullAddress };
