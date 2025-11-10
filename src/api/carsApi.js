// src/api/carsApi.js

const BASE_URL = "http://localhost:3001/api";

/**
 * 🔹 Obtiene los autos desde el backend
 * y los normaliza al formato esperado por el front.
 */
export async function fetchCarsFromBackend() {
  try {
    const response = await fetch(`${BASE_URL}/vehiculos`);
    if (!response.ok) throw new Error("No se pudo conectar con el backend");

    const data = await response.json();

    // Normalización de datos para mantener coherencia con el mock
    const normalized = data.map((car) => ({
      id: car.id_vehiculo || car.id || Math.random(),
      marca: car.marca ? car.marca.toUpperCase() : "SIN MARCA",
      modelo: car.modelo || "Desconocido",
      año: car.anio || car.año || 0,
      combustible: car.combustible || "Desconocido",
      precio: car.precio || 0,
      imagen:
        car.imagen && car.imagen.trim() !== ""
          ? car.imagen
          : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    }));

    return normalized;
  } catch (error) {
    console.error("❌ Error al obtener autos:", error);
    throw error;
  }
}

/**
 * 🔹 Obtiene los vendedores del backend
 */
export async function fetchVendedores() {
  try {
    const response = await fetch(`${BASE_URL}/vendedores`);
    if (!response.ok) throw new Error("No se pudo conectar con el backend");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error al obtener vendedores:", error);
    throw error;
  }
}
