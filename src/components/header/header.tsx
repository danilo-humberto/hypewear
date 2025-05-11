import Discount from "./discount";
import Logo from "./Logo";
import IconsMobile from "./IconsMobile";
import SearchDesktop from "./SearchDesktop";
import IconsDesktop from "./IconsDesktop";

const Header = () => {
  return (
    <header className="bg-background flex flex-col fixed top-0 left-0 right-0 border-b w-full h-24">
      <Discount />
      <div className="w-full flex items-center justify-center py-2 px-8 h-full">
        <Logo />
        <IconsMobile />
        <SearchDesktop />
        <IconsDesktop />
      </div>
    </header>
  );
};

export default Header;
