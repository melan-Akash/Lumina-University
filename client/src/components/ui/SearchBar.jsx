import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-outline" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 border border-outline-variant rounded-xl leading-5 bg-white placeholder-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm transition-shadow duration-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
