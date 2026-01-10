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

export type PriceFacetOption = BaseFacetOption & {
  value: PriceRange;
};

export type StandardFacetOption = BaseFacetOption & {
  value: string;
};

export type PriceRange = {
  gte: number;
  lte: number;
};
