import FashionShowCase from "@/components/fashionShowCase/FashionShowCase";
import Header from "@/components/header/header";
import Hero from "@/components/hero/Hero";
import Wears from "@/components/wears/Wears";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Wears />
      <FashionShowCase />
    </div>
  );
};

export default Home;
