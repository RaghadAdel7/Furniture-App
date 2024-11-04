import React from 'react'
import { TextField } from '@mui/material';

export default function PriceRange(prop) {
    const { setMinPrice, setMaxPrice } = prop;
    
  function onChangeHandlerMinPrice(event) {
    setMinPrice(event.target.value);
  }

  function onChangeHandlerMaxPrice(event) {
    setMaxPrice(event.target.value);
  }
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Enter Min Price"
        variant="standard"
        type="number"
        onChange={onChangeHandlerMinPrice}
      />
      <TextField
        id="standard-basic"
        label="Enter Max Price"
        variant="standard"
        type="number"
        onChange={onChangeHandlerMaxPrice}
      />
    </div>
  );
}
