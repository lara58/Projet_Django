// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import AttractionCard from '../components/AttractionCard';
import axios from 'axios';

const HomePage = () => {
  const [attractions, setAttractions] = useState([]);
  const [profile, setProfile] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    // Récupérer le profil et le pays depuis le localStorage
    const storedProfile = localStorage.getItem('profile');
    const storedCountry = localStorage.getItem('country');
    setProfile(storedProfile);
    setCountry(storedCountry);

    // Faire une requête à l'API avec le pays
    if (storedCountry) {
      fetchAttractions(storedCountry);
    }
  }, []);

  const fetchAttractions = async (country) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/attractions/', {
        params: { country }
      });
      if (response.data && Array.isArray(response.data.data)) {
        setAttractions(response.data.data);
      } else {
        console.error('Unexpected response data:', response.data);
      }
      console.log('Attractions:', response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

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
