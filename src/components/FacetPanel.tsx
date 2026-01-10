import type { Facet } from "../types";
import FacetOption from "./FacetOption";

type FacetPanelProps = {
  facet: Facet; // Initial facet with all options
  currentFacetData?: Facet; // Current facet data from API (may have fewer options)
};

function FacetPanel({ facet, currentFacetData }: FacetPanelProps) {
  const { displayName, identifier } = facet;

  // Create a map of current productCounts for quick lookup
  const currentProductCounts = new Map(
    currentFacetData?.options.map((opt) => [
      opt.identifier,
      opt.productCount,
    ]) || []
  );

  // Use initial facet options but update productCount from current data
  const optionsWithUpdatedCounts = facet.options.map((option) => ({
    ...option,
    productCount: currentProductCounts.get(option.identifier) ?? 0,
  }));

  return (
    <div className="p-2 rounded-xs bg-white shadow-sm space-y-2">
      <h2 className="font-semibold">{displayName}</h2>
      <hr />
      <div className="space-y-2">
        {optionsWithUpdatedCounts.map((option) => (
          <FacetOption
            key={option.identifier}
            option={option}
            facetIdentifier={identifier}
          />
        ))}
      </div>
    </div>
  );
}

export default FacetPanel;
