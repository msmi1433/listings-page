import {
  API_BASE_URL,
  API_KEY,
  LISTINGS_ENDPOINT,
} from "../constants/apiConstants";
import type { UseGetProductListingsParams } from "../hooks/useGetProductListings";
import type { Facet, Pagination, Product } from "../types";

type ProductListingResponse = {
  products: Product[];
  pagination: Pagination;
  facets: Facet[];
};

export const getProductListings = async (
  params: UseGetProductListingsParams
) => {
  const uri = `${API_BASE_URL}${LISTINGS_ENDPOINT}?apiKey=${API_KEY}`;
  const response = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.productType,
      pageNumber: params.pageNumber,
      size: params.size,
      additionalPages: params.additionalPages,
      sort: params.sort,
      facets: params.facets,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product listings");
  }

  const data: ProductListingResponse = await response.json();
  return data;
};
