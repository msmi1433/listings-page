import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProductListings } from "../services/getProductListings";
import { PRODUCT_LISTINGS } from "../constants/cacheKeys";
import type { PriceRange } from "../types/facet";

type FacetQuery = Record<
  string,
  { identifier: string; value: string | PriceRange }[]
>;

export type UseGetProductListingsParams = {
  productType: string;
  pageNumber: number;
  size: number;
  additionalPages: number;
  sort: number;
  facets?: FacetQuery;
};

export const useGetProductListings = (params: UseGetProductListingsParams) =>
  useQuery({
    queryKey: [PRODUCT_LISTINGS, params],
    queryFn: () => getProductListings(params),
    placeholderData: keepPreviousData,
  });
