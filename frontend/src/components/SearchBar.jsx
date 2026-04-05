import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../features/drug/drugSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.drug.searchTerm);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        
        {/* Search Icon */}
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          🔍
        </span>

        {/* Input */}
        <input
          type="text"
          placeholder="Search drugs by name, class..."
          value={searchTerm}
          onChange={handleChange}
          className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent transition duration-200"
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => dispatch(setSearchTerm(""))}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}

      </div>
    </div>
  );
}

export default SearchBar;


