import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import CarCard from "CarCard";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API pública de NHTSA (vehículos)
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json")
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener datos de la API");
        return response.json();
      })
      .then((data) => {
        // Tomamos solo los primeros 12 resultados para no saturar la vista
        const limitedData = data.Results.slice(0, 12).map((item, index) => ({
          id: index,
          marca: item.Make_Name,
          modelo: "Modelo Genérico",
          precio: 20000 + index * 1500,
          anio: 2020 + (index % 4),
          combustible: "Nafta",
          imagen: `https://source.unsplash.com/400x250/?car,${item.Make_Name}`,
          descripcion: `Auto de la marca ${item.Make_Name}, ideal para ciudad.`,
        }));
        setCars(limitedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );

  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <Grid container spacing={3} justifyContent="center">
      {cars.map((car) => (
        <Grid item key={car.id} xs={12} sm={6} md={4}>
          <CarCard car={car} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CarList;
