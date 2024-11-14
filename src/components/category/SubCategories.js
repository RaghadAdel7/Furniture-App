import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Subcategories = () => {
  const { categoryId } = useParams(); 
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5125/api/v1/subcategories`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubcategories();
  }, [categoryId]);

  return (
    <div>
    </div>
  );
};

export default Subcategories;
