import Button from "./Button";

const categories = ["", "Electronics", "Accessories"];

export default function ProductFilters({ category, minPrice, search, onCategoryChange, onMinPriceChange, onSearchChange, onClear }) {
  return (
    <div className="mb-10 flex flex-wrap items-end gap-4">
      <label className="flex min-w-55 flex-1 flex-col gap-1"><span className="text-sm font-medium">Search products</span><input type="search" placeholder="Search" className="rounded-md border p-2" value={search} onChange={(event) => onSearchChange(event.target.value)} /></label>
      <label className="flex flex-col gap-1"><span className="text-sm font-medium">Minimum price</span><input type="number" min="0" className="rounded-md border p-2" value={minPrice} onChange={(event) => onMinPriceChange(event.target.value)} /></label>
      <label className="flex flex-col gap-1"><span className="text-sm font-medium">Category</span><select value={category} onChange={(event) => onCategoryChange(event.target.value)} className="rounded-md border px-3 py-2">{categories.map((value) => <option key={value || "all"} value={value}>{value || "All categories"}</option>)}</select></label>
      <Button onClick={onClear}>Clear filters</Button>
    </div>
  );
}
