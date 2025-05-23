import { useTheme } from "@/hooks/theme-provider";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";

interface FooterProps {
  baseUrl: string;
}

const Footer = ({ baseUrl }: FooterProps) => {
  const { theme } = useTheme();

  return (
    <footer className="bg-background mt-2 p-4 w-full h-auto">
      <div className="flex flex-col md:flex-row justify-between w-full md:w-[90%] mx-auto pb-4 border-b border-b-accent">
        <div>
          <div className="flex items-center -ml-[10px]">
            <img
              src={
                theme === "light"
                  ? `${baseUrl}logo-light.png`
                  : `${baseUrl}logo-dark.png`
              }
              alt="logo da hypewear"
              className="w-12 h-11"
            />
            <p className="font-bold text-xl">HypeWear</p>
          </div>
          <p className="text-foreground/70 text-sm w-full md:w-1/2 lg:w-1/2">
            HypeWear offers the latest fashion trends for men and women,
            combining style, quality, and affordability. Explore our curated
            collections to elevate your wardrobe effortlessly.
          </p>
          <div className="mt-2 flex gap-2">
            <a href="#">
              <FaInstagram className="text-foreground/70 text-2xl hover:text-foreground duration-300 transition-all" />
            </a>
            <a href="#">
              <FaWhatsapp className="text-foreground/70 text-2xl hover:text-foreground duration-300 transition-all" />
            </a>
            <a href="#">
              <FaXTwitter className="text-foreground/70 text-2xl hover:text-foreground duration-300 transition-all" />
            </a>
            <a href="#">
              <FaYoutube className="text-foreground/70 text-2xl hover:text-foreground duration-300 transition-all" />
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
          <div className="flex flex-col gap-2 mr-12">
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
      <div className="py-4 text-center w-full md:w-[90%] mx-auto">
        <p className="text-foreground/70 text-sm">
          &copy; {new Date().getFullYear()} HypeWear. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
