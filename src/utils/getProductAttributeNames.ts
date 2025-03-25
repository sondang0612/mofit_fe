import { Product } from "@/types/api";
import { ATTRIBUTE_LABEL } from "./constants";

const getProductAttributeNames = (product?: Product): string => {
  if (!product?.attributes || product?.attributes?.length === 0) {
    return "";
  }
  return product.attributes
    .map((attr) => {
      const key = attr?.value?.toString();
      return key && ATTRIBUTE_LABEL[key] ? ATTRIBUTE_LABEL[key] : key;
    })
    .join(",");
};

export { getProductAttributeNames };
