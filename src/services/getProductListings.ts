export const getProductListings = async () => {
  const response = await fetch(
    "https://spanishinquisition.victorianplumbing.co.uk/interviews/listings?apikey=yj2bV48J40KsBpIMLvrZZ1j1KwxN4u3A83H8IBvI",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "toilets",
        pageNumber: 0,
        size: 0,
        additionalPages: 0,
        sort: 1,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product listings");
  }

  const data = await response.json();
  return data;
};
