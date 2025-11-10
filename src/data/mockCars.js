
// Vehiculos mokeados

const mockBrands = [
  "Toyota",
  "Ford",
  "Chevrolet",
  "Volkswagen",
  "Honda",
  "Nissan",
  "BMW",
  "Mercedes",
  "Audi",
  "Hyundai",
  "Peugeot",
  "Fiat",
];

const modelos = ["Sedan", "SUV", "Hatchback", "Pickup", "Coupé", "Compacto"];
const combustibles = ["Nafta", "Diesel", "Eléctrico", "Híbrido"];

export const mockCars = mockBrands.map((marca, index) => ({
  id: index + 1,
  marca: marca.toUpperCase(),
  modelo: modelos[Math.floor(Math.random() * modelos.length)],
  año: Math.floor(Math.random() * 15) + 2010, // entre 2010 y 2024
  combustible: combustibles[Math.floor(Math.random() * combustibles.length)],
  precio: Math.floor(Math.random() * 50000) + 15000,
  imagen:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
}));

// Export por defecto opcional (si prefieres default)
export default mockCars;
