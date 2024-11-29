import React from 'react';

const AttractionCard = ({ attraction }) => {
  return (
    <div style={styles.card}>
      <img src={attraction.image} alt={attraction.name} style={styles.image} />
      <h2>{attraction.name}</h2>
      <p>{attraction.description}</p>
      <p>Note: {attraction.rating}</p>
      <p>Prix: {attraction.price} €</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    maxWidth: '300px',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '5px',
  },
};

export default AttractionCard;

