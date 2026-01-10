import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useGetProductListings } from "./useGetProductListings";
import { getProductListings } from "../services/getProductListings";

const mockDefaultParams = {
  productType: "toilets",
  pageNumber: 0,
  size: 10,
  additionalPages: 0,
  sort: 1,
  facets: undefined,
};

const mockApiResponse = {
  products: [],
  pagination: { from: 0, size: 0, sortType: 0, total: 10 },
  facets: [],
};

vi.mock("../services/getProductListings");

const renderHookWithClient = () => {
  const queryClient = new QueryClient();
  const wrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return renderHook(() => useGetProductListings(mockDefaultParams), {
    wrapper,
  });
};

describe("useGetProductListings", () => {
  it("Should call getProductListings with correct params", () => {
    vi.mocked(getProductListings).mockResolvedValueOnce(mockApiResponse);

    renderHookWithClient();

    expect(getProductListings).toHaveBeenCalledTimes(1);
    expect(getProductListings).toHaveBeenCalledWith(mockDefaultParams);
  });
});
