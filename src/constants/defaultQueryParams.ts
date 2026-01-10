import type { UseGetProductListingsParams } from "../hooks/useGetProductListings";

export const defaultQueryParams: UseGetProductListingsParams = {
  productType: "toilets",
  pageNumber: 1,
  size: 30,
  additionalPages: 0,
  sort: 1,
};
