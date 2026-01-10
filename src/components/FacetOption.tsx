import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import type { PriceFacetOption, StandardFacetOption } from "../types/facet";

type FacetOptionProps = {
  option: PriceFacetOption | StandardFacetOption;
  facetIdentifier: string;
};

function FacetOption({ option, facetIdentifier }: FacetOptionProps) {
  const navigate = useNavigate();
  const params = useParams({ from: "/$productListings" });
  const search = useSearch({ from: "/$productListings" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const currentFacets = search.facets || {};
    const currentFacetValues = currentFacets[facetIdentifier] || [];

    // Create an object with both identifier and value
    const facetOption = {
      identifier: option.identifier,
      value: option.value,
    };

    // Stringify the option for storage in URL params
    const stringifiedOption = JSON.stringify(facetOption);

    let updatedFacetValues: string[];
    if (checked) {
      // Add the stringified option if checked
      updatedFacetValues = [...currentFacetValues, stringifiedOption];
    } else {
      // Remove the option if unchecked (match by identifier within the stringified value)
      updatedFacetValues = currentFacetValues.filter((v) => {
        const parsed = JSON.parse(v);
        return parsed.identifier !== option.identifier;
      });
    }

    const updatedFacets = { ...currentFacets };
    if (updatedFacetValues.length > 0) {
      updatedFacets[facetIdentifier] = updatedFacetValues;
    } else {
      // Remove the facet key if no values are selected
      delete updatedFacets[facetIdentifier];
    }

    navigate({
      to: "/$productListings",
      params,
      search: {
        ...search,
        facets: updatedFacets,
        pageNumber: 1, // Reset to first page when filters change
      },
    });
  };

  // Check if this option is currently selected (match by identifier)
  const isChecked =
    search.facets?.[facetIdentifier]?.some((v) => {
      const parsed = JSON.parse(v);
      return parsed.identifier === option.identifier;
    }) || false;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={`facet-${option.identifier}`}
        name={option.displayValue}
        value={JSON.stringify(option.value)}
        checked={isChecked}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor={`facet-${option.identifier}`} className="text-sm">
        {option.displayValue}
      </label>
    </div>
  );
}
export default FacetOption;
