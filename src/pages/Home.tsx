import FashionShowCase from "@/components/fashionShowCase/FashionShowCase";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/header";
import Hero from "@/components/hero/Hero";
import Highlights from "@/components/highlights/Highlights";
import Questions from "@/components/questions/Questions";
import Wears from "@/components/wears/Wears";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Wears />
      <FashionShowCase />
      <Highlights />
      <Questions />
      <Footer />
    </div>
  );
};

export default Home;
