import React from "react";
import Pagination from "@mui/material/Pagination";
function Paginations(prop) {
  const { count, page, handleChange } = prop;

  return (
    <div>
      <Pagination count={count} page={page} onChange={handleChange} />
    </div>
  );
}

export default Paginations;
