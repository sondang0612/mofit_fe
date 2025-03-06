"use client";

import React from "react";
import AddressModal from "./address/AddressModal";
import { useAddresses } from "@/hooks/react-query/addresses/useAddresses";
import Address from "./address/Address";
import { useDeleteAddress } from "@/hooks/react-query/addresses/useDeleteAddress";
import { useSetDefaultAddress } from "@/hooks/react-query/addresses/useSetDefaultAddress";

export default function EditAddress() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data: addresses } = useAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__address">
        <p className="notice">
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="underline cursor-pointer" onClick={onOpen}>
          Thêm địa chỉ mới
        </div>

        {addresses?.data?.map((item) => (
          <Address
            key={item?.id}
            data={item}
            onRemove={(id) => deleteAddress({ id })}
            onSetDefault={(id) => setDefaultAddress({ id })}
          />
        ))}
      </div>

      <AddressModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
