import type { ParsedFacetOption } from "../types/facet";
import type { ProductListingsSearch } from "../schemas/productSearchValidationSchema";
import type { PriceRange } from "../types/facet";

export const convertStringifiedFacetsForQuery = (
  facets: ProductListingsSearch["facets"]
) => {
  if (!facets) return undefined;

  const parsedFacets = Object.entries(facets).reduce(
    (acc, [facetKey, facetValues]) => {
      const parsedValues = facetValues.map((value) => {
        const parsedValue: ParsedFacetOption = JSON.parse(value);
        return {
          identifier: parsedValue.identifier,
          value: parsedValue.value,
        };
      });
      acc[facetKey] = parsedValues;
      return acc;
    },
    {} as Record<string, { identifier: string; value: string | PriceRange }[]>
  );

  return parsedFacets;
};
