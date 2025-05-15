import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

interface NavLink {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface NavigationItemProps {
  title: string;
  sections: NavSection[];
}
const NavigationItem = ({ title, sections }: NavigationItemProps) => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-foreground">
        {title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className={`grid grid-cols-4 gap-6 p-6 max-w-7xl mx-auto`}>
          {sections.map((section, i) => (
            <div key={i} className="col-span-1">
              <p className="text-sm font-semibold text-gray-500 mb-2">
                {section.title}
              </p>
              {section.links.map((link, j) => (
                <NavigationMenuLink asChild key={j}>
                  <a href={link.href}>{link.label}</a>
                </NavigationMenuLink>
              ))}
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default NavigationItem;
