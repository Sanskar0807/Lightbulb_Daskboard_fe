import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectDropdown = ({ dropdownData,handleSelect,selectState,label }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectState}
        label={label}
        onChange={handleSelect}
      >
        {dropdownData?.map((data) => {
          return <MenuItem value={data}>{data}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
