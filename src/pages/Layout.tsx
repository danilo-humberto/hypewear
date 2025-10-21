import Footer from "@/components/footer/Footer";
import Header from "@/components/header/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const baseUrl = import.meta.env.PUBLIC_URL || "";
  return (
    <>
      <Header baseUrl={baseUrl} />
      <main>
        <Outlet />
      </main>
      <Footer baseUrl={baseUrl} />
    </>
  );
};

export default Layout;
