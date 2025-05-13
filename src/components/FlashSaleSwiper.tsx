import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface FlashSaleSwiperProps {
  background: string;
  textColor: string;
  absolute: boolean;
}

const FlashSaleSwiper = ({
  absolute,
  background,
  textColor,
}: FlashSaleSwiperProps) => {
  const slides = Array(15).fill(["2025 Flash Sale", "12:00PM"]).flat();

  return (
    <div
      className={`${background} ${textColor} ${
        absolute ? "absolute top-2/3" : ""
      } w-full py-2 overflow-hidden`}
    >
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop={true}
        speed={5000}
        freeMode={{
          enabled: true,
          momentum: false,
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          reverseDirection: false,
        }}
        slidesPerView="auto"
        spaceBetween={32}
        allowTouchMove={false}
        className="w-full"
      >
        {slides.map((text, index) => (
          <SwiperSlide key={index} className="!w-auto flex items-center">
            <div className="flex items-center whitespace-nowrap">
              <span className="mr-2">•</span>
              {text}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FlashSaleSwiper;
