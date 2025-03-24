import { useUrlParams } from "@/hooks/useUrlParams";
import { Category } from "@/types/api";
import React from "react";

interface Props {
  isActive?: boolean;
  category?: Category | undefined;
}

const FilterCategoryItem = (props: Props) => {
  const { category, isActive } = props;
  const { setParams, getParam } = useUrlParams();
  const activeCategory = Number(getParam("activeCategory"));
  const [toggleSubCategories, setToggleSubCategories] = React.useState(
    category?.subCategories?.find((item) => item.id === activeCategory) !==
      undefined
  );

  const hasSubCategories = React.useMemo(() => {
    if (
      !category ||
      !category?.subCategories ||
      category?.subCategories?.length === 0
    )
      return false;
    return true;
  }, [category?.subCategories]);

  const handleItemClick = () => {
    if (!hasSubCategories) {
      setParams([
        { key: "activeCategory", value: `${category?.id}` },
        { key: "page", value: 1 },
      ]);
      return undefined;
    } else {
      setToggleSubCategories((prev) => !prev);
    }
  };

  return (
    <li
      className={`list-item py-1 cursor-pointer ${isActive && "text-blue-500"}`}
    >
      <span onClick={handleItemClick}>
        {hasSubCategories ? (toggleSubCategories ? "- " : "+ ") : ""}
        {category?.name}
      </span>

      {hasSubCategories && toggleSubCategories && (
        <ul>
          {category?.subCategories?.map((item) => (
            <li
              key={item?.id}
              className={`${item?.id === activeCategory && "text-blue-500"}`}
              onClick={() =>
                setParams([
                  { key: "activeCategory", value: `${item?.id}` },
                  { key: "page", value: 1 },
                ])
              }
            >
              {item?.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default FilterCategoryItem;
