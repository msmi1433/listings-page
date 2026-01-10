import { useQuery } from "@tanstack/react-query";
import { getProductListings } from "../services/getProductListings";
import { PRODUCT_LISTINGS } from "../constants/cacheKeys";

export type UseGetProductListingsParams = {
  productType: string;
};

export const useGetProductListings = (params: UseGetProductListingsParams) =>
  useQuery({
    queryKey: [PRODUCT_LISTINGS, params],
    queryFn: () => getProductListings(params),
  });
