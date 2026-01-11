import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import cn from "classnames";
import type {
  PriceFacetOption,
  PriceRange,
  StandardFacetOption,
} from "../types/facet";

const testIds = {
  checkbox: "facet-option-checkbox",
  label: "facet-option-label",
};

export type ParsedFacetOption = {
  identifier: string;
  value: string | PriceRange;
};

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

    const allSelectedFacets = search.facets ?? {};
    const allSelectedOptionsForThisFacet =
      allSelectedFacets[facetIdentifier] ?? [];

    // Create an object with option identifier and value
    const selectedFacetOption: ParsedFacetOption = {
      identifier: option.identifier,
      value: option.value,
    };

    // Stringify the option object for storage in search params
    const stringifiedSelectedFacetOption = JSON.stringify(selectedFacetOption);

    let updatedFacetOptions: string[];
    if (checked) {
      // Add the stringified option if checked
      updatedFacetOptions = [
        ...allSelectedOptionsForThisFacet,
        stringifiedSelectedFacetOption,
      ];
    } else {
      // Remove the option if unchecked (match by identifier within the stringified value)
      updatedFacetOptions = allSelectedOptionsForThisFacet.filter((option) => {
        const parsedOption = JSON.parse(option) as ParsedFacetOption;
        return parsedOption.identifier !== selectedFacetOption.identifier;
      });
    }

    const updatedAllSelectedFacets = { ...allSelectedFacets };
    if (updatedFacetOptions.length > 0) {
      updatedAllSelectedFacets[facetIdentifier] = updatedFacetOptions;
    } else {
      // Remove the facet key if no values are selected
      delete updatedAllSelectedFacets[facetIdentifier];
    }

    const someFacetsAreSelected =
      Object.keys(updatedAllSelectedFacets).length > 0;

    navigate({
      to: "/$productListings",
      params,
      search: {
        ...search,
        facets: someFacetsAreSelected ? updatedAllSelectedFacets : undefined, // Remove facets param entirely if empty
      },
    });
  };

  const isChecked =
    search.facets?.[facetIdentifier]?.some((v) => {
      const parsed = JSON.parse(v) as ParsedFacetOption;
      return parsed.identifier === option.identifier;
    }) ?? false;

  const isDisabled = option.productCount === 0;

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={`facet-${option.identifier}`}
        value={JSON.stringify(option.value)}
        checked={isChecked}
        onChange={handleChange}
        disabled={isDisabled}
        data-testid={testIds.checkbox}
      />
      <label
        htmlFor={`facet-${option.identifier}`}
        className={cn("text-sm", { "text-gray-400": isDisabled })}
        data-testid={testIds.label}
      >
        {option.displayValue}{" "}
        <span className="text-gray-400">({option.productCount})</span>
      </label>
    </div>
  );
}

FacetOption.testIds = testIds;
export default FacetOption;
