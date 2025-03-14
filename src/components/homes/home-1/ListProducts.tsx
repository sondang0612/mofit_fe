import { Product } from "@/types/api";
import React, { Fragment } from "react";
import SkeletonProduct1 from "./SkeletonProduct1";

interface Props {
  data?: Product[];
  isFetching: boolean;
  n?: number;
  renderItem: ({ data }: { data: Product }) => React.ReactNode;
}

const ListProducts: React.FC<Props> = ({
  n = 4,
  isFetching,
  data = [],
  renderItem,
}) => {
  return (
    <>
      {data.map((product, index) => (
        <Fragment key={product.id || index}>
          {renderItem({ data: product })}
        </Fragment>
      ))}
      {isFetching &&
        Array.from({ length: n }).map((_, index) => (
          <SkeletonProduct1 key={`skeleton-${index}`} />
        ))}
    </>
  );
};

export default ListProducts;
