import React from "react";
import { Link } from "react-router-dom";

function Category(prop) {
  const { category } = prop;

  const categoriesUrl = `${category.id}/subcategories/`;

  return (
    <div>
      <Link to={categoriesUrl}>
        <div>{category.categoryName}</div>
        {/* <div><img src={category.CategoryImage} alt={category.categoryName}/></div> */}
      </Link>
    </div>
  );
}

export default Category;
