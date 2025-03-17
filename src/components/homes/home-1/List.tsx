import { Product } from "@/types/api";
import React, { Fragment } from "react";
import SkeletonProduct1 from "./SkeletonProduct1";

interface Props {
  data?: any[];
  isFetching: boolean;
  n?: number;
  renderItem: ({ data }: { data: any }) => React.ReactNode;
  skeleton?: React.ElementType;
}

const List: React.FC<Props> = (props: Props) => {
  const { n = 4, data, skeleton: Skeleton, isFetching, renderItem } = props;
  return (
    <>
      {data?.map((item, index) => (
        <Fragment key={item?.id || index}>
          {renderItem({ data: item })}
        </Fragment>
      ))}
      {isFetching &&
        Skeleton &&
        Array.from({ length: n }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} />
        ))}
    </>
  );
};

export default List;
