import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface NavLink {
  label: string;
  href: string;
}

interface NavSection {
  title: string;
  links: NavLink[];
}

interface MenuSheetItemProps {
  title: string;
  sections: NavSection[];
}

const MenuSheetItem = ({ sections, title }: MenuSheetItemProps) => {
  return (
    <>
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent className="pl-4">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-2 mb-2">
              <p className="text-muted-foreground">{section.title}</p>
              {section.links.map((link, j) => (
                <ul key={j} className="pl-5 flex flex-col">
                  <li>
                    <a href={link.href}>{link.label}</a>
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

export default MenuSheetItem;
