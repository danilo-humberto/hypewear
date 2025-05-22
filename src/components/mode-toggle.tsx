import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/theme-provider";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { useState } from "react";

export function ModeToggle() {
  const [openPop, setOpenPop] = useState(false);
  const { setTheme, theme } = useTheme();

  const handleTheme = (selectedTheme: "light" | "dark") => {
    if (theme !== selectedTheme) {
      setTheme(selectedTheme);
    }
    setOpenPop(false);
  };

  return (
    <Popover open={openPop} onOpenChange={setOpenPop}>
      <PopoverTrigger
        asChild
        className="cursor-pointer hover:bg-accent p-0 lg:p-2 rounded-md duration-300"
      >
        <button>
          <Sun
            size={25}
            className="rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0"
          />
          <Moon
            size={25}
            className="absolute rotate-90 top-[0.08rem] lg:top-[0.8rem] scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40">
        <ul className="flex flex-col gap-2">
          <li
            className="cursor-pointer p-1 hover:bg-accent transition-all duration-300 rounded-sm"
            onClick={() => handleTheme("light")}
          >
            Light
          </li>
          <Separator />
          <li
            className="cursor-pointer p-1 hover:bg-accent transition-all duration-300 rounded-sm"
            onClick={() => handleTheme("dark")}
          >
            Dark
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
