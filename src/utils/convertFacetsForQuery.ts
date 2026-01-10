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
          const parsed = JSON.parse(value);
          // Extract only identifier and value for the API query
          return {
            identifier: parsed.identifier,
            value: parsed.value,
          };
        } catch {
          return { identifier: value, value };
        }
      });
      acc[facetKey] = parsedValues;
      return acc;
    },
    {} as Record<string, { identifier: string; value: string | PriceRange }[]>
  );

  return parsedFacets;
};
