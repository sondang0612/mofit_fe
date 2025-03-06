import { useDeleteAddress } from "@/hooks/react-query/addresses/useDeleteAddress";
import { Address as IAddress } from "@/types/api";
import { getFullName } from "@/utils/getFullName";
import React from "react";

interface Props {
  data?: IAddress;
  onRemove?: (id?: number) => void;
  onSetDefault?: (id?: number) => void;
  canEdit?: boolean;
}

const Address = (props: Props) => {
  const { data, canEdit = true, onRemove, onSetDefault } = props;
  return (
    <div className="my-account__address-item">
      <div className="my-account__address-item__title">
        <h5>Địa chỉ giao hàng</h5>
        {canEdit && onRemove && (
          <a
            href="#"
            className="text-red-500"
            onClick={() => onRemove(data?.id)}
          >
            Xoá
          </a>
        )}
        {canEdit && !data?.isDefault && onSetDefault && (
          <div
            className="underline cursor-pointer"
            onClick={() => onSetDefault(data?.id)}
          >
            Đặt làm mặc định
          </div>
        )}
      </div>
      <div className="my-account__address-item__detail">
        <p>
          {getFullName(data?.firstName, data?.lastName)} - {data?.phoneNumber}
        </p>
        <p>{data?.streetAddress}</p>
        <p>{data?.district}</p>
        <p>{data?.city}</p>
        {data?.isDefault && <p>Mặc Định</p>}
      </div>
    </div>
  );
};

export default Address;
