import { Input } from "@/components/ui/input";
import { useState, ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-[15px]">
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Поиск..."
        className="w-full"
      />
    </div>
  );
};

export default SearchBar;
