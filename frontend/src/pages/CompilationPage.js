// src/pages/CompilationPage.js
import React, { useState, useEffect } from 'react';
import AttractionCard from '../components/AttractionCard';
import Button from '../components/Button';

const CompilationPage = ({ user }) => {
  // Simulate getting compiled attractions for the user
  const [compilation, setCompilation] = useState({
    attractions: [], // List of selected attractions
    totalBudget: 0,  // Total cost
    totalDistance: 0,  // Total distance (optional)
  });

  // Function to remove an attraction from the compilation
  const removeAttraction = (attractionId) => {
    const updatedAttractions = compilation.attractions.filter(attraction => attraction.id !== attractionId);
    setCompilation({
      ...compilation,
      attractions: updatedAttractions,
    });
    // Recalculate total budget
    const updatedBudget = updatedAttractions.reduce((acc, attraction) => acc + (attraction.price || 0), 0);
    setCompilation(prevState => ({
      ...prevState,
      totalBudget: updatedBudget,
    }));
  };

  // Sort attractions by price or distance
  const sortAttractions = (sortBy) => {
    const sortedAttractions = [...compilation.attractions].sort((a, b) => {
      if (sortBy === 'budget') {
        return (a.price || 0) - (b.price || 0); // Sorting by price
      }
      return (a.distance || 0) - (b.distance || 0); // Sorting by distance
    });
    setCompilation(prevState => ({
      ...prevState,
      attractions: sortedAttractions,
    }));
  };

  // Example useEffect to simulate fetching data
  useEffect(() => {
    // Assuming you have already fetched the user's compilation data
    // Here is some sample data:
    setCompilation({
      attractions: [
        { id: 1, name: 'Attraction 1', price: 20, distance: 5, image: 'image1.jpg' },
        { id: 2, name: 'Attraction 2', price: 50, distance: 3, image: 'image2.jpg' },
        { id: 3, name: 'Attraction 3', price: 30, distance: 10, image: 'image3.jpg' },
      ],
      totalBudget: 100,
      totalDistance: 18,
    });
  }, []);

  return (
    <div style={styles.container}>
      <h1>Votre Compilation</h1>
      
      {/* Attractions list */}
      <div style={styles.attractionsList}>
        {compilation.attractions.map(attraction => (
          <div key={attraction.id} style={styles.attractionItem}>
            <AttractionCard attraction={attraction} />
            <Button
              label="Supprimer"
              onClick={() => removeAttraction(attraction.id)}
              style={styles.removeButton}
            />
          </div>
        ))}
      </div>

      {/* Total Budget and Distance */}
      <div style={styles.totalContainer}>
        <p><strong>Budget total:</strong> {compilation.totalBudget} €</p>
        <p><strong>Distance totale:</strong> {compilation.totalDistance} km</p>
      </div>

      {/* Sort options */}
      <div style={styles.sortContainer}>
        <Button
          label="Trier par Budget"
          onClick={() => sortAttractions('budget')}
          style={styles.sortButton}
        />
        <Button
          label="Trier par Distance"
          onClick={() => sortAttractions('distance')}
          style={styles.sortButton}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#0a0a0a',
    color: '#39ff14',
    fontFamily: '"Arial", sans-serif',
  },
  attractionsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  attractionItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  removeButton: {
    marginTop: '10px',
    backgroundColor: '#ff4136',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  totalContainer: {
    marginTop: '20px',
    fontSize: '1.2rem',
  },
  sortContainer: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  sortButton: {
    backgroundColor: '#39ff14',
    color: 'black',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default CompilationPage;
