import type { Facet } from "../types";
import FacetOption from "./FacetOption";

type FacetPanelProps = { facet: Facet };

function FacetPanel({ facet }: FacetPanelProps) {
  const { displayName, identifier } = facet;

  return (
    <div className="p-2 rounded-xs bg-white shadow-sm space-y-2">
      <h2 className="font-semibold">{displayName}</h2>
      <hr />
      <div className="space-y-2">
        {facet.options.map((option) => (
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
