export type Facet = PriceFacet | StandardFacet;

type BaseFacet = {
  displayName: string;
  facetType: number;
  priority: number;
};

type PriceFacet = BaseFacet & {
  identifier: "prices";
  options: PriceFacetOption[];
};

type StandardFacet = BaseFacet & {
  identifier: string;
  options: StandardFacetOption[];
};

type BaseFacetOption = {
  displayValue: string;
  identifier: string;
  priority: number;
  productCount: number;
};

type PriceFacetOption = BaseFacetOption & {
  value: PriceRange;
};

type StandardFacetOption = BaseFacetOption & {
  value: string;
};

type PriceRange = {
  gte: number;
  lte: number;
};
