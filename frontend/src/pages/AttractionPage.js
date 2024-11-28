import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttractionPage = ({ match }) => {
  const [attraction, setAttraction] = useState(null);
  const { id } = match.params; // Get the attraction ID from the URL

  useEffect(() => {
    axios.get(`API_ENDPOINT/${id}`)
      .then(response => {
        setAttraction(response.data);
      })
      .catch(error => {
        console.error('Error fetching attraction:', error);
      });
  }, [id]);

  if (!attraction) return <div>Loading...</div>;

  return (
    <div>
      <h1>{attraction.name}</h1>
      <p>{attraction.description}</p>
      <p>Prix: {attraction.price}</p>
      <p>Catégorie: {attraction.category}</p>
      {/* Additional attraction details */}
      <button onClick={() => console.log('Add to compilation')}>Ajouter à la compilation</button>
    </div>
  );
};

export default AttractionPage;
