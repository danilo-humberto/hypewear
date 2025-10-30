import { useTheme } from "@/hooks/theme-provider";
import { Link } from "react-router-dom";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <div className="absolute z-50 left-2 sm:left-5 xl:left-10">
      <Link to={"/"} className="flex items-center">
        <img
          src={theme === "light" ? `/logo-light.png` : `/logo-dark.png`}
          alt="logo da HypeWear"
          className="w-12 h-11"
        />
        <span className="font-bold text-xl hidden md:block">HypeWear</span>
      </Link>
    </div>
  );
};

export default Logo;
