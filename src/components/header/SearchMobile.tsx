import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SearchMobile = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Search size={25} />
      </PopoverTrigger>
      <PopoverContent
        align="center"
        sideOffset={8}
        className="w-screen max-w-none left-0 !p-4 !ml-0"
      >
        <form>
          <input
            type="text"
            placeholder="Search"
            className="w-full border-none outline-none "
          />
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default SearchMobile;
