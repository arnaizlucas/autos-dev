import React from "react";
import { Box, Typography, Select, MenuItem, Slider } from "@mui/material";

const Filters = ({
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  cars
}) => {
  return (
    <Box className="filter-container">
      {/* Filtro por marca */}
      <Box>
        <Typography>Marca:</Typography>
        <Select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          displayEmpty
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            minWidth: 150,
            mt: 1,
          }}
        >
          <MenuItem value="">Todas</MenuItem>
          {Array.from(new Set(cars.map((car) => car.marca))).map((marca) => (
            <MenuItem key={marca} value={marca}>
              {marca}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Filtro por rango de precio */}
      <Box sx={{ width: 250 }}>
        <Typography>Rango de Precio:</Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={15000}
          max={65000}
          step={1000}
          sx={{ color: "orange" }}
        />
        <Typography>
          ${priceRange[0]} - ${priceRange[1]}
        </Typography>
      </Box>
    </Box>
  );
};

export default Filters;
