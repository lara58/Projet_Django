// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import AttractionCard from '../components/AttractionCard';
import axios from 'axios';

const HomePage = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    // Fetch attractions from the backend or TripAdvisor API
    axios.get('API_ENDPOINT')
      .then(response => {
        setAttractions(response.data);
      })
      .catch(error => {
        console.error('Error fetching attractions:', error);
      });
  }, []);

  return (
    <div>
      <h1>Attractions Populaires</h1>
      <div className="carousel">
        {attractions.map(attraction => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
