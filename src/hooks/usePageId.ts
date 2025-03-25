import { usePathname } from "next/navigation";

export const usePageId = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = Number(parts[2]);

  return isNaN(id) ? undefined : id;
};
