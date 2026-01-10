import { createFileRoute } from "@tanstack/react-router";
import { useGetProductListings } from "../hooks/useGetProductListings";
import ProductCard from "../components/ProductCard";

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
    <main>
      <h3>Product Listings: hello</h3>
      {productListingsDataIsFetching && <p>Loading...</p>}
      {productListingsData && (
        <section className="grid grid-cols-3 gap-4">
          {productListingsData.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
