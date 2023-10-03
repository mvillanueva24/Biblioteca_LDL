import React from "react";
import Presentacion from "../principal/presentation";
import Carousel from "../principal/carousel";

export default function index() {
  return (
    <div className="max-w-screen-xl mx-auto px-3">
      <Presentacion />
      <Carousel />
      {/* <Carousel /> */}
    </div>
  );
}
