import React from 'react';
import './detailedProperty.css';
import { useLocation } from 'react-router-dom';

const DetailedProperty = () => {
    const location = useLocation();
    const { property } = location.state || {};

    console.log(property);
  return (
    <div className="detailed-container !mt-40">
      <h1 className="property-heading">{property?.name}</h1>

      <div className="image-gallery">
        {property?.detailedDesc?.images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Property Image ${index + 1}`}
            className="gallery-image"
          />
        ))}
      </div>

      <div className="description">
        <p className="desc-text">
          {property?.detailedDesc?.desc}
        </p>
      </div>
    </div>
  );
};

export default DetailedProperty;
