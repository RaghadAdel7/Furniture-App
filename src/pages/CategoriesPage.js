import React from "react";
import Categories from "../components/category/Categories";

function CategoriesPage(prop) {
  const { categoriesList } = prop;
  return (
    <div>
      <Categories categoriesList={categoriesList} />
    </div>
  );
}

export default CategoriesPage;
