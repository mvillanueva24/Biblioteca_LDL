import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Header } from "../scenes/header";
import Principal from "../scenes/body/principal";

export default function Home() {
  return (
    <div>
      <Header />
      <Principal />
    </div>
  );
}
