import { useEffect, useState } from "react";

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
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;