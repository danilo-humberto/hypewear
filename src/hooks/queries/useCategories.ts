import { getCategories } from "@/api/endpoints";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
