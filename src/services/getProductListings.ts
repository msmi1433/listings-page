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
  const response = await fetch(
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: params.productType,
        pageNumber: 0,
        size: 10,
        additionalPages: 0,
        sort: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product listings");
  }

  const data: ProductListingResponse = await response.json();
  return data;
};
