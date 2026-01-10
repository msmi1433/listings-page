import React from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import {
  createRouter,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "../routeTree.gen";

// Create test router with generated route tree
export function createTestRouterFromFiles(initialLocation = "/") {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
    context: {
      // Add any required context for your routes
    },
  });

  return router;
}

// Custom render function for testing individual components that need router context
interface RenderWithRouterOptions extends Omit<RenderOptions, "wrapper"> {
  initialLocation?: string;
  initialSearch?: Record<string, any>;
}

export function renderWithRouter(
  ui: React.ReactElement,
  {
    initialLocation = "/test-component",
    initialSearch = {},
    ...renderOptions
  }: RenderWithRouterOptions = {}
) {
  // Create a simple route tree just for testing
  const rootRoute = createRootRoute();

  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "$productListings",
    component: () => ui,
    validateSearch: (search: Record<string, unknown>) => ({
      ...search,
      facets: search.facets as Record<string, string[]> | undefined,
      pageNumber: (search.pageNumber as number) || 1,
      size: (search.size as number) || 30,
      sort: (search.sort as number) || 1,
    }),
  });

  const routeTree = rootRoute.addChildren([testRoute]);

  const router = createRouter({
    routeTree,
    history: createMemoryHistory({
      initialEntries: [initialLocation],
    }),
  });

  // Navigate to set search params
  router.navigate({
    to: "/$productListings",
    params: { productListings: "test" },
    search: initialSearch,
  });

  return {
    ...render(<RouterProvider router={router} />, renderOptions),
    router,
  };
}

// Keep the old name as an alias for backwards compatibility
export const renderWithFileRoutes = renderWithRouter;

// Helper to test specific file routes
export function createMockFileRoute(
  path: string,
  component: React.ComponentType
) {
  // This is useful for isolated testing when you don't want to use the full route tree
  return {
    path,
    component,
    // Add other common route properties as needed
  };
}
