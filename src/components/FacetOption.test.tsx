import { screen, waitFor } from "@testing-library/react";
import type { StandardFacetOption } from "../types/facet";
import FacetOption from "./FacetOption";
import { renderWithRouter } from "../utils/testUtils";
import userEvent from "@testing-library/user-event";

const mockOption: StandardFacetOption = {
  identifier: "test-option-identifier",
  value: "test-option-value",
  priority: 1,
  displayValue: "Test Option Display Value",
  productCount: 10,
};

const { testIds } = FacetOption;

const renderFacetOptions = (mockOption: StandardFacetOption) => {
  const user = userEvent.setup();
  const { router } = renderWithRouter(
    <FacetOption option={mockOption} facetIdentifier="test-facet" />,
    {
      initialLocation: "/toilets",
      initialSearch: {
        pageNumber: 1,
        size: 30,
        sort: 1,
      },
    }
  );

  return { user, router };
};

describe("FacetOption", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("should render the option with correct label and count", async () => {
    renderFacetOptions(mockOption);

    await waitFor(() => {
      expect(screen.getByTestId(testIds.label)).toBeInTheDocument();
    });

    expect(screen.getByTestId(testIds.label)).toHaveTextContent(
      mockOption.displayValue
    );
    expect(screen.getByTestId(testIds.label)).toHaveTextContent(
      mockOption.productCount.toString()
    );
  });
  it("should disable the checkbox if productCount is 0", async () => {
    renderFacetOptions({ ...mockOption, productCount: 0 });

    await waitFor(() => {
      expect(screen.getByTestId(testIds.checkbox)).toBeInTheDocument();
    });

    expect(screen.getByTestId(testIds.checkbox)).toBeDisabled();
  });
  it("should enable the checkbox if productCount is greater than 0", async () => {
    renderFacetOptions(mockOption);

    await waitFor(() => {
      expect(screen.getByTestId(testIds.checkbox)).toBeInTheDocument();
    });

    expect(screen.getByTestId(testIds.checkbox)).not.toBeDisabled();
  });
  describe("interaction", () => {
    it("should check the checkbox when clicked", async () => {
      const { user } = renderFacetOptions(mockOption);

      const checkbox = await screen.findByTestId(testIds.checkbox);
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });
    it("should append facets to search params when checked", async () => {
      const { user, router } = renderFacetOptions(mockOption);

      const checkbox = await screen.findByTestId(testIds.checkbox);
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      expect(router.state.location.search).toHaveProperty("facets");
      expect(router.state.location.search.facets).toEqual({
        "test-facet": [
          JSON.stringify({
            identifier: "test-option-identifier",
            value: "test-option-value",
          }),
        ],
      });
    });
    it("should remove facets from search params when unchecked", async () => {
      const { user, router } = renderFacetOptions(mockOption);

      const checkbox = await screen.findByTestId(testIds.checkbox);
      expect(checkbox).not.toBeChecked();

      // Check the box
      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      expect(router.state.location.search).toHaveProperty("facets");

      // Uncheck the box
      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();

      expect(router.state.location.search).not.toHaveProperty("facets");
    });
  });
});
