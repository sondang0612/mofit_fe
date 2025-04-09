import { ITEMS_PER_PAGE } from "@/utils/constants";
import React, { Fragment } from "react";

interface Props {
  data?: any[];
  isFetching: boolean;
  n?: number;
  renderItem: ({ data }: { data: any }) => React.ReactNode;
  skeleton?: React.ElementType;
}

const List: React.FC<Props> = (props: Props) => {
  const {
    n = ITEMS_PER_PAGE,
    data,
    skeleton: Skeleton,
    isFetching,
    renderItem,
  } = props;
  return (
    <>
      {isFetching ? (
        Skeleton &&
        Array.from({ length: n }).map((_, index) => (
          <Skeleton key={`skeleton-${index}`} />
        ))
      ) : data && data?.length > 0 ? (
        data?.map((item, index) => (
          <Fragment key={item?.id || index}>
            {renderItem({ data: item })}
          </Fragment>
        ))
      ) : (
        <p className="text-center text-gray-500">Chưa có dữ liệu.</p>
      )}
    </>
  );
};

export default List;
