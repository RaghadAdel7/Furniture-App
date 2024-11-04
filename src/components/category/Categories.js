import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState(null); // Track active category
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5125/api/v1/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    setActiveCategoryId(category.id);

    if (!subcategories[category.id]) {
      try {
        const response = await axios.get(
          `http://localhost:5125/api/v1/categories/${category.id}`
        );
        setSubcategories((prev) => ({
          ...prev,
          [category.id]: response.data.subcategories,
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    }
  };

 const handleSubcategoryClick = (subcategory) => {
   navigate(
     `http://localhost:5125//api/v1/subcategories/${subcategory.subCategoryId}/products`,

   );   
};

console.log("Categories:", categories);
console.log("Subcategories:", subcategories);
console.log("Active Category ID:", activeCategoryId);

  return (
    <nav>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <span onClick={() => handleCategoryClick(category)}>
              <strong>{category.categoryName}</strong>
            </span>
            {activeCategoryId === category.id &&
              subcategories[category.id] &&
              subcategories[category.id].length > 0 && (
                <ul>
                  {subcategories[category.id].map((subcategory) => (
                    <li key={subcategory.subCategoryId}>
                      <span onClick={() => handleSubcategoryClick(subcategory)}>
                        {subcategory.subCategoryName}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
      {selectedSubcategory && (
        <div>
          <h2>Products in {selectedSubcategory.subCategoryName}</h2>
          <ul>
            {products.map((product) => (
              <li key={product.productId}>
                <Link to={`/products/${product.productId}`}>
                  {product.productName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
// import React from "react";

// import Category from "./Category";

// export default function Categories(prop) {
//   const { categoriesList } = prop;

//   return (
//     <div>
//       <div>Our categories</div>
//       {categoriesList.map((category) => {
//         return <Category key={category.id} category={category} />;
//       })}
//     </div>
//   );
// }