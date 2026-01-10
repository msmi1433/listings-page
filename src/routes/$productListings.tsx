import { createFileRoute } from "@tanstack/react-router";
import FacetPanel from "../components/FacetPanel";
import ProductCard from "../components/ProductCard";
import { defaultQueryParams } from "../constants/defaultQueryParams";
import { useGetProductListings } from "../hooks/useGetProductListings";
import { ProductListingsSearchSchema } from "../schemas/productSearchValidationSchema";
import { convertFacetsForQuery } from "../utils/convertFacetsForQuery";

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

  return (
    <main>
      {productListingsDataIsFetching && <p>Loading...</p>}
      {productListingsData && (
        <div className="grid grid-cols-4 gap-4 items-start">
          <section className="col-span-1 space-y-1">
            {productListingsData.facets.map((facet) => (
              <FacetPanel key={facet.identifier} facet={facet} />
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
