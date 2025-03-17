"use client";
import { useCategories } from "@/hooks/react-query/categories/useCategories";
import { EDefaultValue } from "@/utils/constants/default-value.enum";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NewArrivals = () => {
  const { data: categories } = useCategories();
  const router = useRouter();

  return (
    <div className="products-carousel container">
      <h2 className="section-title mb-4 pb-xl-2 mb-xl-2">Mới ra mắt</h2>

      <div className="position-relative grid grid-cols-3 gap-sm">
        {categories?.data
          ?.filter((item, index) => index < 3)
          ?.map((elm, i) => (
            <div className="pc__img-wrapper" key={i}>
              <Link href={`/shop-1?activeCategory=${elm.id}`}>
                <Image
                  loading="lazy"
                  src={elm.imgSrc || EDefaultValue.IMAGE}
                  width="348"
                  height="348"
                  alt="Cropped Faux leather Jacket"
                  className="pc__img"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
