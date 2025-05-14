import FlashSaleSwiper from "../FlashSaleSwiper";
import { Button } from "../ui/button";
import Features from "./Features";

const FashionShowCase = () => {
  return (
    <section className="w-full flex flex-col gap-4">
      <FlashSaleSwiper
        absolute={false}
        background={"bg-foreground"}
        textColor={"text-background"}
      />
      <div className="w-full bg-background h-auto p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 mt-6 mx-auto lg:flex-row md:w-[60%] lg:w-[85%]">
          <div className="w-full h-auto lg:flex-1/2">
            <img
              src="https://images.pexels.com/photos/1036396/pexels-photo-1036396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="foto de um homem usando roupas estilo streewear"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <div className="p-4 bg-accent rounded-md flex flex-col justify-between gap-2 lg:flex-1/2 lg:p-6 h-auto">
            <div className="flex flex-col gap-4 py-8">
              <h2 className="font-bold text-2xl">Stay Fresh with HypeWear</h2>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                Looking for real drip? At HypeWear, we know style is more than
                just clothes — it's attitude, it's identity. That's why we drop
                collections that blend comfort, quality, and that bold touch
                that makes you stand out without even trying. Whether you're on
                the move or just chillin', our pieces are made to match your
                grind and your vibe.
              </p>
              <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
                Forget the same old stuff. We're all about fresh drops, unique
                energy, and fits that speak for you before you say a word.
                Whether you're linking with the crew, hitting the streets, or
                snapping that perfect fit pic, HypeWear's got what you need to
                look your best. No second-guessing — shop now and show the world
                your style.
              </p>
            </div>
            <Button variant={"outline"} className="w-fit mb-2">
              Learn More
            </Button>
          </div>
        </div>
        <Features />
      </div>
    </section>
  );
};

export default FashionShowCase;
