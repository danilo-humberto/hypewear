import { ShieldCheck, Smartphone, Truck } from "lucide-react";
import { Separator } from "../ui/separator";

const featuresData = [
  {
    icon: <ShieldCheck size={40} />,
    title: "Secure Payments",
    description:
      "Transactions secured with end-to-end encryption for your peace of mind.",
  },
  {
    icon: <Truck size={40} />,
    title: "Fast Delivery",
    description:
      "Receive your orders quickly with our efficient logistics system.",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile Friendly",
    description:
      "Optimized experience for all devices, from desktop to mobile.",
  },
];

const Features = () => {
  return (
    <div className="w-full flex flex-col gap-6 my-15 mx-auto lg:flex-row md:w-[60%] lg:w-[85%]">
      {featuresData.map((feature, index) => {
        return (
          <div
            key={index}
            className="flex flex-col lg:flex-row items-center w-full"
          >
            <div className="flex flex-col items-center gap-2 flex-[1] lg:max-w-[413px]">
              {feature.icon}
              <h3 className="font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-center">
                {feature.description}
              </p>
            </div>
            {/* Separador horizontal para mobile */}
            {index < featuresData.length - 1 && (
              <>
                <div className="block lg:hidden w-1/2 my-6">
                  <Separator />
                </div>

                <div className="hidden lg:block h-1/2 px-6">
                  <Separator orientation="vertical" />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Features;
