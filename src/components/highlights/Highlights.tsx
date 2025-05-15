import { Button } from "../ui/button";

const Highlights = () => {
  const sections = [
    {
      title: "Women's Trendy Styles",
      description:
        "Explore the latest fashion trends for women. From chic to casual, find styles for every occasion.",
      image:
        "https://images.pexels.com/photos/2315196/pexels-photo-2315196.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Men's Fashion Essentials",
      description:
        "Shop a curated collection of must-have men's styles, from classic pieces to modern fashion statements.",
      image:
        "https://images.pexels.com/photos/1954861/pexels-photo-1954861.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      title: "Accessories to Complete",
      description:
        "Find stylish accessories to elevate any outfit. From bags to jewelry, add the perfect finishing touch.",
      image:
        "https://images.pexels.com/photos/2471300/pexels-photo-2471300.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  return (
    <div className="w-full mt-4 h-auto flex flex-col gap-2 md:flex-row">
      {sections.map((section, index) => (
        <div key={index} className="relative flex-1/3">
          <img
            src={section.image}
            alt={section.title}
            className="brightness-[60%] w-full object-cover h-[600px] md:h-[650px] lg:h-[700px]"
          />
          <div className="absolute px-4 lg:px-8 inset-0 z-20 top-[60%] text-background w-full flex flex-col items-center justify-center gap-2">
            <h4 className="font-bold tracking-wider text-[1.2rem] dark:text-foreground">
              {section.title}
            </h4>
            <p className="text-center text-muted/75 dark:text-foreground/75 leading-tight">
              {section.description}
            </p>
            <Button
              variant={"link"}
              className="text-accent/75 border border-accent/75 dark:border-foreground/50 dark:text-foreground/75"
            >
              Show More
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Highlights;
