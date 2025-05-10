import { CircleUserRound, Menu, Search, ShoppingBag } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import Discount from "./discount";
import { useTheme } from "@/hooks/theme-provider";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="bg-background flex flex-col fixed top-0 left-0 right-0 border-b w-full h-24">
      <Discount />
      <div className="w-full flex items-center justify-center py-2 px-8 h-full">
        <div className="flex items-center absolute z-50 left-2 sm:left-5 xl:left-10">
          <img
            src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
            alt="logo da HypeWear"
            className="w-12 h-11"
          />
          <span className="font-bold text-xl">HypeWear</span>
        </div>

        <div className="flex gap-3 items-center absolute right-5 lg:hidden">
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
          <div className="relative">
            <ShoppingBag />
            <span className="absolute -top-2.5 -right-1 bg-red-400 w-4 h-4 text-[12px] rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right">
              <p>teste</p>
              <ModeToggle />
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:w-[40%] lg:relative lg:block">
          <Search className="absolute z-50 right-4 top-2.5" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="bg-input pl-4 pr-12 py-2.5 rounded-xl outline-none text-foreground w-full placeholder:text-foreground text-sm"
          />
        </div>

        <div className="hidden lg:flex items-center gap-2 absolute right-10">
          <ModeToggle />
          <div className="flex items-center gap-1 cursor-pointer p-2 rounded-md transition-all duration-300 hover:bg-accent relative">
            <ShoppingBag />
            <span className="absolute -top-0 -right-0 bg-red-400 w-4 h-4 text-[12px] rounded-full flex items-center justify-center">
              0
            </span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer p-2 rounded-md transition-all duration-300 hover:bg-accent">
            <CircleUserRound />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
