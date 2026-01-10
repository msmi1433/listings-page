import { createFileRoute } from "@tanstack/react-router";
import PageLayout from "../components/PageLayout";
import { useGetProductListings } from "../hooks/useGetProductListings";

export const Route = createFileRoute("/$productListings")({
  component: ProductListings,
});

function ProductListings() {
  const { productListings } = Route.useParams();
  const {
    data: productListingsData,
    isFetching: productListingsDataIsFetching,
  } = useGetProductListings();

  return (
    <>
      <h3>Product Listings: {productListings}</h3>
      {productListingsDataIsFetching && <p>Loading...</p>}
      {/* Add your product listings display here */}
    </>
  );
}
