import { useQuery } from "@tanstack/react-query";
import { getProductListings } from "../services/getProductListings";

export const useGetProductListings = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["productListings"],
    queryFn: getProductListings,
  });
  console.log(data, "data");
  return { data, error, isLoading };
};
