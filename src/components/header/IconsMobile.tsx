import { ShoppingBag } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import SearchMobile from "./SearchMobile";
import MenuSheet from "./MenuSheet";

const IconsMobile = () => {
  return (
    <div className="flex gap-3 items-center absolute right-5 lg:hidden">
      <ModeToggle />
      <SearchMobile />
      <div className="relative">
        <ShoppingBag />
        <span className="absolute -top-2.5 -right-1 bg-foreground text-background w-4 h-4 text-[12px] rounded-full flex items-center justify-center">
          0
        </span>
      </div>
      <MenuSheet />
    </div>
  );
};

export default IconsMobile;
