import Breadcrumb from "@/components/Breadcrumb";
import { sortingOptions } from "@/data/products/productCategories";
import { useUrlParams } from "@/hooks/useUrlParams";
import { openModalShopFilter } from "@/utils/aside";
import { pathNames } from "@/utils/constants/paths";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { BiTransfer } from "react-icons/bi";

interface Props {
  isMobile?: boolean;
}

const SoftFilter = (props: Props) => {
  const { isMobile } = props;
  const pathName = usePathname();
  const { params: searchParams, getParam } = useUrlParams();
  const router = useRouter();
  const sortingValue = getParam("sortingValue");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (selectedValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sortingValue", selectedValue);

      router.push(`?${params?.toString()}`, { scroll: false });
    }
  };

  return (
    pathName === pathNames.STORE && (
      <div className="bg-white">
        <div className={`shop-filter-header pb-1 container`}>
          <Breadcrumb />

          <div className="d-flex columns m-2 justify-content-between shop-filter-container">
            <div className="d-flex align-items-center order-0 order-md-3">
              <button
                className="btn-link btn-link_f d-flex align-items-center ps-0 js-open-aside"
                onClick={openModalShopFilter}
              >
                <span
                  className="text-uppercase fw-bold d-inline-block align-middle border px-4 py-2 border-black"
                  style={{ color: "#131313" }}
                >
                  <BiTransfer size={24} color="#131313" />
                  Lọc và sắp xếp
                </span>
              </button>
            </div>
            <div className="btn-link btn-link_f shop-acs d-flex px-1 border-black border">
              <select
                className="shop-acs__select form-select w-auto border-0 py-0 order-1 order-md-0"
                aria-label="Sort Items"
                name="total-number"
                value={sortingValue || "all"}
                onChange={handleChange}
              >
                {sortingOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SoftFilter;
