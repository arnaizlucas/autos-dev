import React, { useState } from "react";
import "./CarModal.css";

const CarModal = ({ car, onClose }) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!car) return null;

  // Usamos la imagen real del auto, y si no tiene, mostramos un fallback
  const images = [
    car.imagen && car.imagen.trim() !== ""
      ? car.imagen
      : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=60",
    "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=800&q=60",
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          {/* Galería */}
          <div className="image-gallery">
            <img
              src={images[currentImage]}
              alt={`${car.marca} ${car.modelo}`}
              className="gallery-image"
            />
            <div className="gallery-controls">
              <button onClick={prevImage}>←</button>
              <button onClick={nextImage}>→</button>
            </div>
          </div>

          {/* Información del auto */}
          <div className="car-info">
            <h2>
              {car.marca} {car.modelo}
            </h2>
            <p>
              <strong>Año:</strong> {car.año || "Desconocido"}
            </p>
            <p>
              <strong>Combustible:</strong> {car.combustible || "Desconocido"}
            </p>
            <p>
              <strong>Precio:</strong>{" "}
              {car.precio ? `$${car.precio.toLocaleString()}` : "Sin precio"}
            </p>
            <p className="car-description">
              {car.descripcion ||
                "Un vehículo confiable, moderno y listo para la aventura."}
            </p>

            <button className="contact-btn">Contactar Vendedor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarModal;
