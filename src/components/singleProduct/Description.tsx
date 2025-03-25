import { Product } from "@/types/api";
import React from "react";

interface Props {
  product?: Product;
}

export default function Description(props: Props) {
  const { product } = props;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: product?.description || "",
      }}
    ></div>
  );
}
