import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Navigation from "./Navigation";
import FlashSaleSwiper from "../FlashSaleSwiper";

interface HeroProps {
  baseUrl: string;
}

const Hero = ({ baseUrl }: HeroProps) => {
  return (
    <main id="top" className="w-full h-auto mt-[96px] relative scroll-mt-28">
      <img
        src={`${baseUrl}hero-img.jpg`}
        alt="foto de uma menina usando roupas estilo streewear"
        className="w-full h-screen object-cover brightness-30 z-0"
      />
      <div className="z-10 absolute -top-10 left-0 flex flex-col items-center justify-center gap-3 min-h-full w-full p-4">
        <Navigation />
        <h1 className="text-background dark:text-foreground text-6xl">
          HypeWear
        </h1>
        <p className="text-background dark:text-foreground/60 text-center text-sm">
          HypeWear offers trendy, high-quality fashion at affordable prices,
          perfect for any occasion and style.
        </p>
        <div className="flex gap-2">
          <Button variant={"secondary"}>Shop Now</Button>
          <Button variant={"default"}>
            Learn More
            <ChevronRight />
          </Button>
        </div>
      </div>
      <FlashSaleSwiper
        absolute={true}
        background={"bg-background"}
        textColor={"text-foreground"}
      />
    </main>
  );
};

export default Hero;
