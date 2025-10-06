import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ onSearch, placeholder = "Search conversations..." }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative">
      <ApperIcon 
        name="Search" 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-12 pr-10"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;