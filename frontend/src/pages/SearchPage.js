import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttractionCard from '../components/AttractionCard';

const SearchPage = () => {
  const [filters, setFilters] = useState({ category: '', location: '', priceRange: '' });
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    if (!filters.category || !filters.location || !filters.priceRange) return;

    setLoading(true);
    setError(null);

    // Make the API request
    axios.get('http://127.0.0.1:8000/api/attractions/', { params: filters })
      .then(response => {
        setAttractions(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erreur lors de la récupération des attractions.');
        setLoading(false);
      });
  }, [filters]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Rechercher des attractions</h1>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Catégorie"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Localisation"
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Plage de prix"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            style={styles.input}
          />
        </div>
      </header>

      {error && <p style={styles.errorMessage}>{error}</p>}

      {loading ? (
        <div style={styles.loading}>Chargement...</div>
      ) : (
        <div style={styles.attractions}>
          {attractions.length > 0 ? (
            attractions.map(attraction => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))
          ) : (
            <p style={styles.noResults}>Aucune attraction trouvée.</p>
          )}
        </div>
      )}

      <div style={styles.carousel}>
        <img src="carousel-image1.jpg" alt="Attraction 1" style={styles.carouselImage} />
        <img src="carousel-image2.jpg" alt="Attraction 2" style={styles.carouselImage} />
        <img src="carousel-image3.jpg" alt="Attraction 3" style={styles.carouselImage} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '10px',
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    width: '30%',
    borderRadius: '5px',
    border: '1px solid #ddd',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    width: '30%',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
  },
  inputFocus: {
    borderColor: '#39ff14',
    outline: 'none',
    boxShadow: '0 0 8px rgba(0, 255, 0, 0.5)',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#39ff14',
  },
  attractions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#333',
  },
  errorMessage: {
    color: 'red',
    fontSize: '1.2rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  carousel: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  carouselImage: {
    width: '200px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    transition: 'transform 0.3s ease',
  },
  carouselImageHover: {
    transform: 'scale(1.05)',
  },
};

export default SearchPage;

