import { useTheme } from "@/hooks/theme-provider";

interface LogoProps {
  baseUrl: string;
}

const Logo = ({ baseUrl }: LogoProps) => {
  const { theme } = useTheme();
  return (
    <div className="flex items-center absolute z-50 left-2 sm:left-5 xl:left-10">
      <img
        src={
          theme === "light"
            ? `${baseUrl}logo-light.png`
            : `${baseUrl}logo-dark.png`
        }
        alt="logo da HypeWear"
        className="w-12 h-11"
      />
      <span className="font-bold text-xl">HypeWear</span>
    </div>
  );
};

export default Logo;
