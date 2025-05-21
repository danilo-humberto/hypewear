import FashionShowCase from "@/components/fashionShowCase/FashionShowCase";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/header";
import Hero from "@/components/hero/Hero";
import Highlights from "@/components/highlights/Highlights";
import Questions from "@/components/questions/Questions";
import Wears from "@/components/wears/Wears";
import { ArrowUpFromDot } from "lucide-react";

const Home = () => {
  const baseUrl = process.env.PUBLIC_URL || "";
  return (
    <div className="w-screen overflow-x-hidden">
      <Header baseUrl={baseUrl} />
      <main className="flex flex-col w-full">
        <Hero baseUrl={baseUrl} />
        <Wears />
        <FashionShowCase />
        <Highlights />
        <Questions />
      </main>
      <Footer baseUrl={baseUrl} />
      <a
        href="#top"
        className="fixed bottom-4 right-4 bg-foreground z-40 p-3 rounded-full hover:bg-accent-foreground duration-200 transition-colors cursor-pointer"
      >
        <ArrowUpFromDot className="text-background" />
      </a>
    </div>
  );
};

export default Home;
