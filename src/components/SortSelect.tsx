import { useNavigate, useParams, useSearch } from "@tanstack/react-router";

type SortSelectProps = {
  currentSort: number;
  routePath: "/$productListings" | "/";
  sortOptions: Record<string, number>;
};

function SortSelect({ currentSort, routePath, sortOptions }: SortSelectProps) {
  const navigate = useNavigate();
  const params = useParams({ from: routePath });
  const search = useSearch({ from: routePath });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    navigate({
      to: routePath,
      params,
      search: {
        ...search,
        sort: Number(selectedValue),
      },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="sort-select" className="font-semibold">
        Sort by
      </label>
      <select
        id="sort-select"
        className="border rounded-md p-2"
        value={currentSort}
        onChange={handleSelectChange}
      >
        {Object.entries(sortOptions).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SortSelect;
