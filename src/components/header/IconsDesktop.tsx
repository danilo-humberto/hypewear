import { ChevronsUpDown, CircleUserRound, Cog, LogIn } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Cart from "./Cart";

const IconsDesktop = () => {
  return (
    <div className="hidden lg:flex items-center gap-2 absolute right-10">
      <ModeToggle />
      <Cart />
      <div className="flex items-center gap-1 cursor-pointer p-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className="flex-row-reverse gap-4">
              <div className="flex items-center gap-2 flex-row-reverse">
                <CircleUserRound />
                <span>Account</span>
              </div>
              <ChevronsUpDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="mr-12">
            <ul className="flex flex-col gap-2">
              <li className="flex items-center cursor-pointer gap-2 text-foreground/70 hover:bg-accent transition-all duration-300 p-2 rounded-sm">
                <LogIn size={20} />
                <a href="#">Login / Register</a>
              </li>
              <Separator />
              <li className="flex items-center cursor-pointer gap-2 text-foreground/70 hover:bg-accent transition-all duration-300 p-2 rounded-sm">
                <Cog size={20} />
                <a href="#">Settings</a>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default IconsDesktop;
