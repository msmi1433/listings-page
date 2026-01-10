import cn from "classnames";
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

    // Create an object with identifier and value
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

    const hasAnyFacets = Object.keys(updatedFacets).length > 0;

    navigate({
      to: "/$productListings",
      params,
      search: {
        ...search,
        facets: hasAnyFacets ? updatedFacets : undefined, // Remove facets param entirely if empty
        pageNumber: 1, // Reset to first page when filters change
      },
    });
  };

  const isChecked =
    search.facets?.[facetIdentifier]?.some((v) => {
      const parsed = JSON.parse(v);
      return parsed.identifier === option.identifier;
    }) || false;

  const isDisabled = option.productCount === 0;

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
        disabled={isDisabled}
      />
      <label
        htmlFor={`facet-${option.identifier}`}
        className={cn("text-sm", { "text-gray-400": isDisabled })}
      >
        {option.displayValue}{" "}
        <span className="text-gray-400">({option.productCount})</span>
      </label>
    </div>
  );
}
export default FacetOption;
