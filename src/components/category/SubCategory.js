import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export default function Subcategory(prop) {
  const { subcategory, setAnything } = prop;

  const subcategoryId = `/subcategories/${subcategory.subCategoryId}/products/`;

  return (
    <div>
      <Link
        to={subcategoryId}
        onClick={() => setAnything(subcategory.subCategoryId)}
      >
        <div>{subcategory.name}</div>
        {/* <div>
        <img src={subcategory.SubCategoryImage} alt={subcategory.name} />
      </div> */}
      </Link>
    </div>
  );
}
