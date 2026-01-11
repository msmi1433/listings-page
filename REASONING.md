# Reasoning

The purpose of this file is to explain the tech-stack that was selected for this project.

I will also outline some improvements that I'd make if given more time.

## Tech stack

### TanStack Router

- TanStack Router was chosen as I decided that I wanted to drive API filtering/querying via the URL
- This router has very rich search param features and also provides solid type safety; it was therefore a good choice for the job
- I did consider using other global state management tools (Redux, useContext), but ultimately decided to pursue a URL based approach (in line with your website)

### TanStack Query

- TanStack Query was chosen as I felt that caching would be important given the vast amount of query data that can be passed to the API
- It also works well with TanStack Router
- Unfortunately the caching does not seem to be working properly (getting an API call for any change to the query), but given more time I would have ensured the cache was working as intended

### Zod

- A validation tool was necessary to guard the search params that drive API querying
- Zod was chosen primarily for compatibility, as it was recommended by TanStack Router

### Tailwind

- Tailwind is the best modern CSS framework in my opinion
- It is easy to follow and I find that it improves dev experience drastically, especially in larger projects

## Improvements

If I had more time, these are the improvements that I would have liked to implement:

- **Proper styling**
  - I chose to focus on functionality over style for this test
- **Robust testing**
  - Although I created a couple of test files to showcase my skills, this project should have much better test coverage
- **Better use of router search params**
  - The search params approach to query state management became a bit clunky when dealing with facets
  - The type safety is flaky due to the use of `JSON.stringify()`
  - This could potentially be improved by hashing the facet option values and identifiers
- **More pagination utilities**
  - The pagination implementation is very basic
  - I would like to implement a 'load more'/infinite query approach, or, a better pagination UI tool that lets users navigate directly to specific pages
