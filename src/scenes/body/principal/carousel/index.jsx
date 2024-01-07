import React, { useState, useEffect } from "react";
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
  const [libros, setLibros] = useState([]);

  // useEffect(() => {
  //   // Realizar la solicitud a la API usando fetch
  //   const fetchData = async () => {
  //     const result = await fetch(
  //       "https://7211-187-86-164-82.ngrok-free.app/api/libros",
  //       {
  //         method: "GET",
  //         headers: {
  //           // Authorization: "ak_2WpdCVHmAYXCqbSnuDcW6FAiJP1",
  //           // "Content-Type": "application/json",
  //           "ngrok-skip-browser-warning": "69420",

  //           // Otras cabeceras según sea necesario
  //         },
  //       }
  //     );
  //     result.json().then((json) => {
  //       setLibros(json);
  //     });
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    // Realiza la consulta al backend
    fetch("https://3317-187-86-164-82.ngrok-free.app/api/libros", {
      method: "GET",
      headers: {
        // Authorization: "ak_2WpdCVHmAYXCqbSnuDcW6FAiJP1",
        // "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",

        // Otras cabeceras según sea necesario
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Almacena los resultados en el estado
        setLibros(data);
      });
  }, []);

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
        {libros.map((libro) => (
          <SwiperSlide key={libro.id}>
            <Libro libro={libro} libros={libros} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
