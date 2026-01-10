import { createFileRoute } from "@tanstack/react-router";
import { useGetProductListings } from "../hooks/useGetProductListings";

export const Route = createFileRoute("/$productListings")({
  component: ProductListings,
});

function ProductListings() {
  const { productListings: productType } = Route.useParams();
  const {
    data: productListingsData,
    isFetching: productListingsDataIsFetching,
  } = useGetProductListings({ productType });

  return (
    <>
      <h3>Product Listings: hello</h3>
      {productListingsDataIsFetching && <p>Loading...</p>}
      {/* Add your product listings display here */}
    </>
  );
}
