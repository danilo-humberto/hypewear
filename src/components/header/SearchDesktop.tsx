import { Search } from "lucide-react";

const SearchDesktop = () => {
  return (
    <div className="hidden lg:w-[40%] lg:relative lg:block">
      <Search className="absolute z-50 right-4 top-2.5" size={20} />
      <input
        type="text"
        placeholder="Search"
        className="bg-input pl-4 pr-12 py-2.5 rounded-xl outline-none text-foreground w-full placeholder:text-foreground text-sm"
      />
    </div>
  );
};

export default SearchDesktop;
