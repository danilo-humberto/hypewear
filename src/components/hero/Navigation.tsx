import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { menuData } from "./menuData";
import NavigationItem from "./NavigationItem";

const Navigation = () => {
  return (
    <NavigationMenu className="absolute top-0 mt-2 w-screen hidden lg:block">
      <NavigationMenuList className="w-full">
        {menuData.map((item, i) => (
          <NavigationItem
            key={i}
            title={item.title}
            columns={item.columns}
            sections={item.sections}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
