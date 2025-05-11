import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/swiper-bundle.css";

const FlashSaleSwiper = () => {
  const slides = Array(10).fill(["2025 Flash Sale", "12:00PM"]).flat();

  return (
    <div className="bg-background w-full absolute top-2/3 px-8 py-2 overflow-hidden">
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
