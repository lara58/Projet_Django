import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const [profile, setProfile] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleProfileChange = (event) => {
    setProfile(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = async () => {
    if (profile && country) {
      // Store the profile and country info in localStorage
      localStorage.setItem('profile', profile);
      localStorage.setItem('country', country);

      try {
        // Make an API call to get filtered attractions
        const response = await axios.get('http://127.0.0.1:8000/api/attractions/', {
          params: { profile, country },
        });

        // Handle the response, like storing it in state or redirecting
        console.log(response.data);
        navigate('/home');  // Redirect to home page after successful submission
      } catch (error) {
        console.error('Error fetching attractions:', error);
        setErrorMessage('Impossible de récupérer les attractions');
      }
    } else {
      setErrorMessage('Veuillez remplir tous les champs');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Choisissez votre profil et pays</h1>
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

      <div style={styles.formGroup}>
        <label style={styles.label}>Profil:</label>
        <select value={profile} onChange={handleProfileChange} style={styles.select}>
          <option value="local">Local</option>
          <option value="tourist">Touriste</option>
          <option value="professional">Professionnel</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Pays:</label>
        <input 
          type="text" 
          placeholder="Entrez votre pays" 
          value={country} 
          onChange={handleCountryChange} 
          style={styles.input}
        />
      </div>

      <button onClick={handleSubmit} style={styles.button}>Soumettre</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#2b2b2b',
    color: '#f1f1f1',
    fontFamily: '"Arial", sans-serif',
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
    minHeight: '70vh',  // Minimum height to ensure the container isn't too small
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#39ff14',  // Green for the title
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    display: 'block',
    color: '#d3d3d3',
  },
  select: {
    padding: '12px',
    fontSize: '1.1rem',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #39ff14',
    color: '#39ff14',
    backgroundColor: '#1a1a1a',
    transition: 'background-color 0.3s ease',
  },
  input: {
    padding: '12px',
    fontSize: '1.1rem',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #39ff14',
    color: '#39ff14',
    backgroundColor: '#1a1a1a',
    transition: 'background-color 0.3s ease',
  },
  button: {
    backgroundColor: '#39ff14',
    color: '#2b2b2b',
    border: 'none',
    padding: '15px 30px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 4px 6px rgba(0, 255, 0, 0.6)',
  },
  errorMessage: {
    color: 'red',
    fontSize: '1.1rem',
    marginBottom: '20px',
  },
  buttonHover: {
    backgroundColor: '#28a410',  // Darker green on hover
    transform: 'scale(1.05)',
  },
};

export default LandingPage;
