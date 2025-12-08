import { ModeToggle } from "../mode-toggle";
import MenuSheet from "./MenuSheet";
import Cart from "./Cart";

const IconsMobile = () => {
  return (
    <div className="flex gap-3 items-center absolute right-5 lg:hidden">
      <ModeToggle />
      <Cart />
      <MenuSheet />
    </div>
  );
};

export default IconsMobile;
