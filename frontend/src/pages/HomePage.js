import React, { useState, useEffect } from 'react';
import AttractionCard from '../components/AttractionCard';
import axios from 'axios';

const HomePage = () => {
  const [attractions, setAttractions] = useState([]);
  
  useEffect(() => {
    // Récupérer les attractions de l'API
    axios.get('http://127.0.0.1:8000/api/attractions/')
      .then(response => {
        setAttractions(response.data);
      })
      .catch(error => {
        console.error('Error fetching attractions:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Attractions Populaires</h1>
        <p style={styles.subtitle}>Découvrez les meilleures attractions autour de vous</p>
      </header>

      <div style={styles.carousel}>
        {/* Carrousel avec des images attractives */}
        <img src="carousel-image1.jpg" alt="Attraction 1" style={styles.carouselImage} />
        <img src="carousel-image2.jpg" alt="Attraction 2" style={styles.carouselImage} />
        <img src="carousel-image3.jpg" alt="Attraction 3" style={styles.carouselImage} />
      </div>

      <div style={styles.attractions}>
        {/* Afficher les cartes d'attractions */}
        {attractions.length > 0 ? (
          attractions.map(attraction => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))
        ) : (
          <p style={styles.noResults}>Aucune attraction trouvée.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    fontFamily: '"Arial", sans-serif',
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '40px 20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginTop: '10px',
  },
  carousel: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
  },
  carouselImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  attractions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  noResults: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
};

export default HomePage;
