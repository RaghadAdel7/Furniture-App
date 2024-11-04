import React from "react";
import Hero from "../components/hero/Hero";
import Categories from "../components/category/Categories";
export default function HomePage(categories) {
  return (
    <div>
      <Hero />
      <Categories categories={categories} />
    </div>
  );
}
