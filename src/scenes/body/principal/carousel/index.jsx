import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.min.css";
import Libro from "./libro";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";

// Import Swiper core styles separately
import "swiper/swiper-bundle.min.css";

// Import the required modules
SwiperCore.use([Navigation, Pagination]);

export default function index() {
  return (
    <div className="flex bg-gray-100 mt-16 h-auto p-3">
      <Swiper
        breakpoints={{
          0: {
            // width: 576,
            slidesPerView: 2,
          },

          600: {
            // width: 576,
            slidesPerView: 3,
          },
          768: {
            // width: 576,
            slidesPerView: 3.5,
          },
          900: {
            // width: 576,
            slidesPerView: 4.4,
          },
          1024: {
            // width: 768,
            slidesPerView: 5,
          },
          1200: {
            // width: 768,
            slidesPerView: 5.4,
          },
        }}
        slidesPerView={5.4}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
        <SwiperSlide>
          <Libro />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
