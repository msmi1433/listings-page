import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

const stockStatusTextMap = {
  G: "In Stock",
} as const;

export default function ProductCard({ product }: ProductCardProps) {
  const { productName, image, brand, price, stockStatus, score } = product;

  return (
    <div className="rounded space-y-4 bg-white">
      <img
        src={image.url}
        alt={image.attributes.imageAltText}
        className="rounded"
      />
      <div className="px-2 pb-4">
        <img
          className="max-w-15"
          src={brand.brandImage.url}
          alt={brand.brandImage.attributes.imageAltText}
        />
        <p className="min-h-16">{productName}</p>
        <p className="text-lg font-bold text-red-600">£{price.priceIncTax}</p>
        <p className="text-sm">{stockStatusTextMap[stockStatus.status]}</p>
      </div>
    </div>
  );
}
