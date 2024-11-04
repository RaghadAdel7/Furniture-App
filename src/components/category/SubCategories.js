import React from "react";


const Subcategories = ({ subcategories }) => {
  return (
    <ul>
      {subcategories.map((subcategory) => (
        <li key={subcategory.subCategoryId}>
          <span>{subcategory.subCategoryName}</span>
        </li>
      ))}
    </ul>
  );
};

export default Subcategories;
// import React, { useState, useEffect } from "react";

// import Subcategory from "./SubCategory";

// export default function Subcategories(prop) {
//   const { subcategoriesList, setAnything } = prop;

//   return (
//     <div>
//       <div>subcategories</div>
//       {subcategoriesList.subCategory.map((subcategory) => {
//         return (
//           <Subcategory
//             key={subcategory.subCategoryId}
//             subcategory={subcategory}
//             setAnything={setAnything}
//           />
//         );
//       })}
//     </div>
//   );
// }
