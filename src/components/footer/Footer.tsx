import { useTheme } from "@/hooks/theme-provider";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="bg-background mt-4 p-4 w-full h-auto">
      <div className="flex flex-col md:flex-row justify-between w-full md:w-[90%] mx-auto pb-4 border-b border-b-accent">
        <div>
          <div className="flex items-center -ml-[10px]">
            <img
              src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
              alt="logo da hypewear"
              className="w-12 h-11"
            />
            <p className="font-bold text-xl">HypeWear</p>
          </div>
          <p className="text-foreground/70 text-sm w-1/2">
            HypeWear offers the latest fashion trends for men and women,
            combining style, quality, and affordability. Explore our curated
            collections to elevate your wardrobe effortlessly.
          </p>
          <div className="mt-2 flex gap-2">
            <a href="#">
              <FaInstagram className="text-foreground/70 text-2xl" />
            </a>
            <a href="#">
              <FaWhatsapp className="text-foreground/70 text-2xl" />
            </a>
            <a href="#">
              <FaXTwitter className="text-foreground/70 text-2xl" />
            </a>
            <a href="#">
              <FaYoutube className="text-foreground/70 text-2xl" />
            </a>
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-between w-[400px]">
          <div className="flex flex-col gap-2">
            <p className="font-bold">Costumer Care</p>
            <ul className="text-foreground/70">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Shipping</a>
              </li>
              <li>
                <a href="#">Order Status</a>
              </li>
              <li>
                <a href="#">Return & Exchange</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold">Company</p>
            <ul className="text-foreground/70">
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Guides</a>
              </li>
              <li>
                <a href="#">Term of Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="py-4 border-b border-b-accent text-center w-full md:w-[90%] mx-auto">
        <p className="text-foreground/70 text-sm">
          &copy; {new Date().getFullYear()} HypeWear. All rights reserved
        </p>
      </div>
      <p className="text-foreground/10 text-center text-8xl md:text-[12rem] lg:text-[15rem] xl:text-[18rem] 2xl:text-[20rem] lg:tracking-widest capitalize lg:mb-15">
        hypwear
      </p>
    </footer>
  );
};

export default Footer;
