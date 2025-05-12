import Header from "@/components/header/header";
import Hero from "@/components/hero/Hero";
import Wears from "@/components/wears/Wears";

const Home = () => {
  return (
    <div className="relative">
      <Header />
      <Hero />
      <Wears />
    </div>
  );
};

export default Home;
