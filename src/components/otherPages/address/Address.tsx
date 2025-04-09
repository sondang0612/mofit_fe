import { Address as IAddress } from "@/types/api";
import { getFullName } from "@/utils/getFullName";
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { getFullAddress } from "@/utils/getAddress";
import { MdOutlineAddLocation } from "react-icons/md";

interface Props {
  data?: IAddress;
  onRemove?: (id?: number) => void;
  onSetDefault?: (id?: number) => void;
  canEdit?: boolean;
}

const Address = (props: Props) => {
  const { data, canEdit = true, onRemove, onSetDefault } = props;
  return (
    <div className="my-account__address-item relative mb-2">
      <div className="my-account__address-item__title">
        <div className="my-account__address-item__title-wrapper">
          <h5>Địa chỉ nhận hàng</h5>
          {data?.isDefault && <p>Mặc Định</p>}
        </div>
        <div className="d-flex gap-1">
          {canEdit && onRemove && (
            <div data-toggle="tooltip" data-placement="top" title="Xoá">
              <AiOutlineDelete
                size={20}
                color="red"
                className="cursor-pointer"
                onClick={() => onRemove(data?.id)}
              />
            </div>
          )}
          {canEdit && !data?.isDefault && onSetDefault && (
            <div
              data-toggle="tooltip"
              data-placement="top"
              title="Đặt làm mặc định"
            >
              <MdOutlineAddLocation
                size={20}
                onClick={() => onSetDefault(data?.id)}
                className="cursor-pointer"
                color="blue"
              />
            </div>
          )}
        </div>
      </div>
      <div className="my-account__address-item__detail">
        <div>
          <FaUser size={18} color="#333333" />
          {getFullName(data?.firstName, data?.lastName)}
        </div>
        <div>
          <FaPhoneAlt size={18} color="#333333" />
          {data?.streetAddress}
        </div>
        <div>
          <FaLocationDot size={18} color="#333333" />
          {getFullAddress(data)}
        </div>
      </div>
    </div>
  );
};

export default Address;
