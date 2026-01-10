import { z } from "zod";

export const ProductListingsSearchSchema = z.object({
  facets: z
    .record(
      z.string(), // The facet identifier (e.g., "brand", "prices")
      z.array(z.string()) // Array of stringified option objects
    )
    .optional(),
  pageNumber: z.number().optional(),
  size: z.number().optional(),
  sort: z.number().optional(),
});

export type ProductListingsSearch = z.infer<typeof ProductListingsSearchSchema>;
