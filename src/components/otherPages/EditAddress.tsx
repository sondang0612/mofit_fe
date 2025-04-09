"use client";

import { useAddresses } from "@/hooks/react-query/addresses/useAddresses";
import { useDeleteAddress } from "@/hooks/react-query/addresses/useDeleteAddress";
import { useSetDefaultAddress } from "@/hooks/react-query/addresses/useSetDefaultAddress";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import List from "../homes/home-1/List";
import AddressModal from "./address/AddressModal";
import { useFetch } from "@/hooks/react-query/useFetch";
import { Address as IAddress } from "@/types/api";
import { apiEndpoints } from "@/utils/constants/apiEndpoints";
import SkeletonAddress from "./address/SkeletonAddress";
import Address from "./address/Address";
import Pagination from "../shoplist/Pagination";
import { ITEMS_PER_PAGE } from "@/utils/constants";

export default function EditAddress() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate: deleteAddress } = useDeleteAddress();
  const { mutate: setDefaultAddress } = useSetDefaultAddress();
  const [currentPage, setCurrentPage] = React.useState(1);
  const {
    data: addresses,
    isFetching,
    totalElements,
  } = useFetch<IAddress>({
    page: currentPage,
    endpoint: apiEndpoints.ADDRESSES,
    limit: ITEMS_PER_PAGE,
  });
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderItem = React.useCallback(({ data }: { data: IAddress }) => {
    return (
      <Address
        data={data}
        key={data?.id}
        onRemove={(id) => deleteAddress({ id })}
        onSetDefault={(id) => setDefaultAddress({ id })}
      />
    );
  }, []);

  return (
    <div className="col-lg-9">
      <div className="page-content my-account__address">
        <p className="notice">Sổ địa chỉ</p>
        <div className="add-new" onClick={onOpen}>
          <AiOutlinePlus size={18} color="#1890FF" />
          <span>Thêm địa chỉ mới</span>
        </div>
        <div className="mb-4">
          <List
            data={addresses}
            isFetching={isFetching}
            renderItem={renderItem}
            n={2}
            skeleton={SkeletonAddress}
          />
        </div>
        <Pagination totalItems={totalElements} onChange={onPageChange} />
      </div>

      <AddressModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
