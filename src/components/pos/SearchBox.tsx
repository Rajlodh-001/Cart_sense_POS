import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBoxProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="relative w-full mb-5">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none">
          <Search className="text-gray-400" size={20} strokeWidth={2.5} />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search menu items..."
          className="w-full pl-12 pr-14 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-all duration-300 outline-none font-medium text-sm"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Filter Button */}
        <button className="absolute right-2 w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-primary-blue-dark hover:text-white text-gray-400 transition-all duration-300">
          <SlidersHorizontal size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
