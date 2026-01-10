import { useQuery } from "@tanstack/react-query";
import { getProductListings } from "../services/getProductListings";
import { PRODUCT_LISTINGS } from "../constants/cacheKeys";

export const useGetProductListings = () =>
  useQuery({
    queryKey: [PRODUCT_LISTINGS],
    queryFn: getProductListings,
  });
