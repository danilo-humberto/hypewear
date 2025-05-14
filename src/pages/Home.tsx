import FashionShowCase from "@/components/fashionShowCase/FashionShowCase";
import Header from "@/components/header/header";
import Hero from "@/components/hero/Hero";
import Questions from "@/components/questions/Questions";
import Wears from "@/components/wears/Wears";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Wears />
      <FashionShowCase />
      <Questions />
    </div>
  );
};

export default Home;
