import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttractionPage = ({ match }) => {
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = match.params; // Get the attraction ID from the URL

  useEffect(() => {
    // Fetch data from API with the attraction ID
    axios.get(`http://127.0.0.1:8000/api/attractions/${id}`)
      .then(response => {
        setAttraction(response.data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch(error => {
        console.error('Error fetching attraction:', error);
        setError('Unable to load attraction details. Please try again later.');
        setLoading(false);
      });
  }, [id]);

  // Loading state handling
  if (loading) return <div style={styles.loader}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{attraction.name}</h1>
        <img src={attraction.imageUrl} alt={attraction.name} style={styles.image} />
      </div>

      <div style={styles.details}>
        <p style={styles.description}>{attraction.description}</p>
        <p style={styles.info}><strong>Prix:</strong> {attraction.price} €</p>
        <p style={styles.info}><strong>Catégorie:</strong> {attraction.category}</p>
        {/* Additional details can be added */}
      </div>

      <div style={styles.actions}>
        <button style={styles.button} onClick={() => console.log('Add to compilation')}>Ajouter à la compilation</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    fontFamily: '"Arial", sans-serif',
    maxWidth: '800px',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#39ff14',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  details: {
    marginTop: '20px',
    lineHeight: '1.6',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '15px',
  },
  info: {
    fontSize: '1rem',
    marginBottom: '10px',
  },
  actions: {
    marginTop: '30px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#39ff14',
    color: 'black',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '10px',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 4px 6px rgba(0, 255, 0, 0.6)',
  },
  loader: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#39ff14',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'red',
  },
};

export default AttractionPage;
