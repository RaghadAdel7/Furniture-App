import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  // const [selectedCategoryId, setSelectedCategoryId] = useState(null); 

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
  return (
    <div>

    </div>
  );
};

export default Categories;
