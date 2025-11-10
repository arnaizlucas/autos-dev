import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function CarCard({ car }) {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", borderRadius: 3, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={car.imagen}
        alt={`${car.marca} ${car.modelo}`}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {car.marca}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Modelo: {car.modelo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Año: {car.año}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CarCard;
