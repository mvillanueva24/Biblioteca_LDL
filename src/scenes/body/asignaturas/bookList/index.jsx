import React from "react";
import BookCard from "./bookCard";

export default function index() {
  return (
    <div className="w-full border border-blue-700">
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  );
}
