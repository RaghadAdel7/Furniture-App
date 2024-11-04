// import React from 'react'

// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import SubCategories from "../../components/category/SubCategories";

// function SubcategoriesPage(prop) {
//   const { categoriesUrl, setAnything } = prop;
//   const params = useParams();
//   let categoryId = params.categoryId;
//   const url = categoriesUrl + categoryId;

//   const [subcategoriesList, setSubcategoriesList] = useState({
//     id: "",
//     categoryName: "",
//     subCategory: [],
//     productsL: 0,
//   });
//   const [loadingData, setLoadingData] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     function FetchData() {
//       axios
//         .get(url)
//         .then((response) => {
//           setSubcategoriesList(response.data);
//           setLoadingData(false);
//         })
//         .catch((error) => {
//           setErrorMessage(error);
//           setLoadingData(false);
//         });
//     }

//     FetchData();
//   }, [url]);
//   return (
//     <div>
//       <SubCategories
//         subcategoriesList={subcategoriesList}
//         // setAnything={setAnything}
//       />
//     </div>
//   );
// }

// export default SubcategoriesPage