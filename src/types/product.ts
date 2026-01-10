export type Product = {
  id: string;
  productName: string;
  attributes: Record<string, boolean>;
  averageRating: number;
  brand: Brand;
  cultureCode: CultureCode;
  defaultCategory: Category;
  image: Image;
  isDefaultVariant: boolean;
  legacyId: string;
  legacyVariantId: string;
  price: Price;
  questionsCount: number;
  reviewsCount: number;
  score: number;
  sku: string;
  slug: string;
  stockStatus: StockStatus;
};

type Image = {
  attributes: { imageAltText: string; imageUrl: string };
  externalId: string;
  isDefault: boolean;
  priority: number;
  url: string;
};

type Brand = {
  externalId: string;
  name: string;
  slug: string;
  brandImage: Image;
};

//Extensible union for other potential codes
type CultureCode = "en-GB";

type Category = {
  externalId: string;
  name: string;
  slug: string;
  isDefault: boolean;
  ancestors: Omit<Category, "isDefault"> & { depth: number }[];
};

type BasePrice = {
  currencyCode: string;
  priceExcTax: number;
  priceIncTax: number;
};

type Price =
  | (BasePrice & {
      isOnPromotion: true;
      wasPriceExcTax: number;
      wasPriceIncTax: number;
    })
  | (BasePrice & {
      isOnPromotion: false;
    });

type StockStatus = { status: "G" };
