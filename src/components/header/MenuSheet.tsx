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
import { CircleUserRound, Menu } from "lucide-react";
import { menuData } from "../menuData";
import MenuSheetItem from "./MenuSheetItem";
const MenuSheet = () => {
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
          <SheetDescription>
            <div className="flex items-center gap-2">
              <CircleUserRound />
              <span>Account</span>
            </div>
          </SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
