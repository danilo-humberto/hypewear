import { CircleUserRound, ShoppingBag } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const IconsDesktop = () => {
  return (
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
  );
};

export default IconsDesktop;
