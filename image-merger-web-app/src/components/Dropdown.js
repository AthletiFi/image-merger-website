// Dropdown.js
import React from 'react';
import { Select, MenuItem } from '@mui/material';

function Dropdown({ value, onChange, options }) {
  return (
    <Select value={value} onChange={onChange}>
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default Dropdown;
