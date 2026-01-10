import type { ProductListingsSearch } from "../schemas/productSearchValidationSchema";
import type { PriceRange } from "../types/facet";

export const convertFacetsForQuery = (
  facets: ProductListingsSearch["facets"]
) => {
  if (!facets) return undefined;

  const parsedFacets = Object.entries(facets).reduce(
    (acc, [facetKey, facetValues]) => {
      const parsedValues = facetValues.map((value) => {
        try {
          return JSON.parse(value);
        } catch {
          return { value };
        }
      });
      acc[facetKey] = parsedValues;
      return acc;
    },
    {} as Record<string, { identifier: string; value: string | PriceRange }[]>
  );

  return parsedFacets;
};
