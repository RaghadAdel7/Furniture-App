import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NavBar.css";
const CategoriesDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5125/api/v1/categories"
        );
        setCategories(categoryResponse.data);

        const subCategoryResponse = await axios.get(
          "http://localhost:5125/api/v1/subcategories"
        );
        setSubCategories(subCategoryResponse.data);
      } catch (error) {
        console.error("Error fetching categories or subcategories:", error);
      }
    };

    fetchCategoriesAndSubCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(
      categoryId === selectedCategoryId ? null : categoryId
    );
  };

  return (
    <li
      className="dropdown"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button className="menu-button">Products</button>
      {isDropdownOpen && (
        <ul className="dropdown-menu">
          <li>
            <Link to="/products">View All</Link>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="category">
              <button
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={() => setIsDropdownOpen(true)} 
              >
                {category.categoryName}
              </button>
              {selectedCategoryId === category.id && (
                <ul className="subcategories">
                  {subCategories
                    .filter((sub) => sub.categoryId === category.id)
                    .map((sub) => (
                      <li key={sub.subCategoryId}>
                        <Link
                          to={`/subcategories/${sub.subCategoryId}/products`}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default CategoriesDropdown;
