import { ModeToggle } from "../mode-toggle";
import SearchMobile from "./SearchMobile";
import MenuSheet from "./MenuSheet";
import Cart from "./Cart";

const IconsMobile = () => {
  return (
    <div className="flex gap-3 items-center absolute right-5 lg:hidden">
      <ModeToggle />
      <SearchMobile />
      <Cart />
      <MenuSheet />
    </div>
  );
};

export default IconsMobile;
