import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CircleUserRound, Menu } from "lucide-react";
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
            <AccordionItem value="item-1">
              <AccordionTrigger>Latest Collections</AccordionTrigger>
              <AccordionContent>T-Shirt</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Best</AccordionTrigger>
              <AccordionContent>T-Shirt</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Style</AccordionTrigger>
              <AccordionContent>T-Shirt</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Men</AccordionTrigger>
              <AccordionContent>T-Shirt</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Woman</AccordionTrigger>
              <AccordionContent>T-Shirt</AccordionContent>
            </AccordionItem>
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
