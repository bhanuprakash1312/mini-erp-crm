import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onSearch,
  placeholder = "Search...",
  delay = 500,
}) => {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, delay);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={16} className="text-slate-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-indigo focus:border-brand-indigo transition-all"
      />
    </div>
  );
};

export default SearchBar;