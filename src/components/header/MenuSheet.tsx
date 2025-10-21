import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Accordion } from "../ui/accordion";
import { CircleUserRound, Menu, ChevronsUpDown, LogIn } from "lucide-react";
import { menuData } from "../menuData";
import MenuSheetItem from "./MenuSheetItem";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const MenuSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={25} />
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>HypeWear</SheetTitle>
          <SheetDescription>Best choice for you</SheetDescription>
        </SheetHeader>
        <div className="p-4">
          <Accordion type="single" collapsible className="w-full">
            {menuData.map((item, i) => (
              <MenuSheetItem
                key={i}
                title={item.title}
                sections={item.sections}
              />
            ))}
          </Accordion>
        </div>
        <SheetFooter>
          <SheetDescription className="h-[50px]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="h-full">
                <Button variant={"outline"} className="w-full justify-between">
                  <div className="flex gap-2 items-center">
                    <CircleUserRound size={25} />
                    <span>Account</span>
                  </div>
                  <ChevronsUpDown size={25} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2 text-foreground/70">
                    <LogIn size={20} />
                    <Link to="/auth/login">Entrar</Link>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
