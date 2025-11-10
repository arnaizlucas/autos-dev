// src/components/ActionButtons.jsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { mockCars } from "../data/mockCars";

const ActionButtons = React.memo(({ fetchFromBackend, fetchVendedores, setCars, setError, setSelectedBrand, loading, error }) => {
  return (
    <Box className="button-container">
      <Button
        type="button"
        variant="contained"
        color="warning"
        onClick={fetchFromBackend}
        >
       Cargar desde la Base de Datos 
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="warning"
        onClick={() => {
          setCars(mockCars);
          setError(null);
          setSelectedBrand("");
        }}
      >
        Volver a datos mockeados
      </Button>

      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={async () => {
          try {
            setError(null);
            const vendedores = await fetchVendedores();
            console.log("Vendedores:", vendedores);
            alert(`Se obtuvieron ${vendedores.length} vendedores (ver consola)`);
          } catch (err) {
            setError("No se pudieron obtener los vendedores del servidor.");
          }
        }}
      >
        Ver Vendedores
      </Button>

      {error && (
        <Typography color="error" mt={2} width="100%">
          {error}
        </Typography>
      )}
    </Box>
  );
});

export default ActionButtons;
