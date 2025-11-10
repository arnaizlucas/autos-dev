import React, { useEffect, useState } from "react";
import { mockCars } from "./data/mockCars";
import CarModal from "./components/CarModal";
import ActionButtons from "./components/ActionButtons";
import Filters from "./components/Filters";
import { fetchCarsFromBackend, fetchVendedores } from "./api/carsApi";
import "./App.css";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Select,
  MenuItem,
  Slider,
  Button,
} from "@mui/material";

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([15000, 65000]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  // Mostrar mockeados por defecto al cargar
  useEffect(() => {
    setCars(mockCars);
  }, []);

  // Cargar datos desde backend
  const fetchFromBackend = async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCar(null); // Limpia el modal anterior
      setSelectedBrand(""); // resetea elñ filtro

      const cars = await fetchCarsFromBackend(); // ya viene normalizado
      setCars(cars);
    } catch (err) {
      setError("No se pudieron obtener los autos del servidor.");
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros
  const filteredCars = cars.filter((car) => {
    const byBrand =
      selectedBrand === "" || car.marca === selectedBrand.toUpperCase();
    const byPrice =
      car.precio >= priceRange[0] && car.precio <= priceRange[1];
    return byBrand && byPrice;
  });

  //  Control del modal
  const handleOpen = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedCar(null);
    setOpen(false);
  };

  return (
    <Box className="app-container">
      <Typography variant="h4" className="app-title">
        Catálogo de Comunidauto
      </Typography>

     <ActionButtons
        fetchFromBackend={fetchFromBackend}
        fetchVendedores={fetchVendedores}
        setCars={setCars}
        setError={setError}
        setSelectedBrand={setSelectedBrand}
        loading={loading}
        error={error}
      />

      {/*Filtros */}
      <Filters
  selectedBrand={selectedBrand}
  setSelectedBrand={setSelectedBrand}
  priceRange={priceRange}
  setPriceRange={setPriceRange}
  cars={cars}
/>

      {/* Listado de autos */}
      {filteredCars.length === 0 ? (
        <Typography color="white" textAlign="center">
          No se encontraron autos con esos filtros.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <Card className="car-card" onClick={() => handleOpen(car)}>
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    car.imagen && car.imagen.trim() !== ""
                      ? car.imagen
                      : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60"
                  }
                  alt={car.marca}
                />
                <CardContent>
                  <Typography variant="h6">{car.marca}</Typography>
                  <Typography variant="body2">{car.modelo}</Typography>
                  <Typography variant="body2">Año: {car.año}</Typography>
                  <Typography variant="body1" color="orange">
                    Precio: ${car.precio.toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <CarModal car={selectedCar} onClose={handleClose} />
    </Box>
  );
}

export default App;
