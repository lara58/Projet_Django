// src/pages/SearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttractionCard from '../components/AttractionCard';

const SearchPage = () => {
  const [filters, setFilters] = useState({ category: '', location: '', priceRange: '' });
  const [attractions, setAttractions] = useState([]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    axios.get('API_ENDPOINT', { params: filters })
      .then(response => {
        setAttractions(response.data);
      })
      .catch(error => {
        console.error('Error fetching filtered attractions:', error);
      });
  }, [filters]);

  return (
    <div>
      <h1>Rechercher des attractions</h1>
      <div>
        <label>Catégorie:</label>
        <input type="text" name="category" value={filters.category} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Localisation:</label>
        <input type="text" name="location" value={filters.location} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Plage de prix:</label>
        <input type="text" name="priceRange" value={filters.priceRange} onChange={handleFilterChange} />
      </div>
      <div className="attractions">
        {attractions.map(attraction => (
          <AttractionCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
