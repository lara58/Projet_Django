// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import AttractionCard from '../components/AttractionCard';
import axios from 'axios';

const HomePage = () => {
  const [attractions, setAttractions] = useState([]);

  const fetchAttractions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/attractions/', {
        params: {
          country: 'France' 
        }
      });
      setAttractions(response.data);
      console.log('Attractions:', response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  useEffect(() => {
    fetchAttractions();
  }, []);

  return (
    <div>
      <h1>Attractions Populaires</h1>
      <div>
        {attractions.map(attraction => (
          <AttractionCard key={attraction.location_id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
