import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import FacetPanel from "../components/FacetPanel";
import ProductCard from "../components/ProductCard";
import { defaultQueryParams } from "../constants/defaultQueryParams";
import { useGetProductListings } from "../hooks/useGetProductListings";
import { ProductListingsSearchSchema } from "../schemas/productSearchValidationSchema";
import { convertFacetsForQuery } from "../utils/convertFacetsForQuery";
import type { Facet } from "../types";

export const Route = createFileRoute("/$productListings")({
  component: ProductListings,
  validateSearch: (search) => ProductListingsSearchSchema.parse(search),
});

function ProductListings() {
  const { productListings: productType } = Route.useParams();
  const search = Route.useSearch();

  const facetsForQuery = convertFacetsForQuery(search.facets);

  const queryParams = {
    ...defaultQueryParams,
    productType,
    pageNumber: search.pageNumber || defaultQueryParams.pageNumber,
    size: search.size || defaultQueryParams.size,
    sort: search.sort || defaultQueryParams.sort,
    facets: facetsForQuery,
  };

  const {
    data: productListingsData,
    isFetching: productListingsDataIsFetching,
  } = useGetProductListings(queryParams);

  // Store initial facets on first load (when no filters are applied)
  const initialFacetsRef = useRef<Facet[] | null>(null);
  if (productListingsData && !initialFacetsRef.current && !search.facets) {
    initialFacetsRef.current = productListingsData.facets;
  }

  // Use initial facets if available, otherwise use current facets from API
  const facetsToDisplay =
    initialFacetsRef.current || productListingsData?.facets || [];

  return (
    <main>
      {productListingsDataIsFetching && <p>Loading...</p>}
      {productListingsData && (
        <div className="grid grid-cols-4 gap-4 items-start">
          <section className="col-span-1 space-y-1">
            {facetsToDisplay.map((facet) => (
              <FacetPanel
                key={facet.identifier}
                facet={facet}
                currentFacetData={productListingsData.facets.find(
                  (f) => f.identifier === facet.identifier
                )}
              />
            ))}
          </section>
          <section className="grid grid-cols-3 gap-4 col-span-3">
            {productListingsData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </div>
      )}
    </main>
  );
}
