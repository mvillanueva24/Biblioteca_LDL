import React from "react";
import { Header } from "../scenes/header";
import Loginscene from "../scenes/body/login";

export default function Login() {
  return (
    <div className="relative">
      <Header />
      <section class="bg-gray-50 h-[screen -60px]">
        <Loginscene />
      </section>
    </div>
  );
}
