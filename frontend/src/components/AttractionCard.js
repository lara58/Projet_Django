// src/components/AttractionCard.js
import React from 'react';

const AttractionCard = ({ attraction }) => {
  return (
    <div className="attraction-card">
      <img src={attraction.image} alt={attraction.name} />
      <h3>{attraction.name}</h3>
      <p>{attraction.description}</p>
      <p>Note: {attraction.rating}</p>
      <p>{attraction.price}€</p>
      <button>Voir plus</button>
    </div>
  );
};

export default AttractionCard;

