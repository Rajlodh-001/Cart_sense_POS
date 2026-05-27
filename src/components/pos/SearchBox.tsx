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
    <div className="relative w-full mb-5 font-sans">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-5 pointer-events-none">
          <Search className="text-gray-400" size={18} strokeWidth={2.5} />
        </div>

        {/* Input */}
        <input
          id="pos-search-input"
          type="text"
          placeholder="Search menu items..."
          className="w-full pl-14 pr-16 py-4 rounded-full bg-white border border-gray-100 shadow-sm text-gray-700 placeholder-gray-400 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all duration-300 outline-none font-bold text-sm"
          value={searchQuery} 
          onChange={(e) => onSearchChange(e.target.value)}
        />

        {/* Filter Button */}
        <button className="absolute right-2 px-4 py-2 flex items-center justify-center rounded-full bg-gray-50 hover:bg-primary hover:text-white text-gray-400 transition-all duration-300 group">
          <SlidersHorizontal size={16} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
