import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [profile, setProfile] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  const handleProfileChange = (event) => {
    setProfile(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSubmit = () => {
    if (profile && country) {
      // Store the profile and country info in localStorage or context
      localStorage.setItem('profile', profile);
      localStorage.setItem('country', country);
      navigate('/home');
    }
  };

  return (
    <div>
      <h1>Choisissez votre profil et pays</h1>
      <div>
        <label>Profil:</label>
        <select value={profile} onChange={handleProfileChange}>
          <option value="local">Local</option>
          <option value="tourist">Touriste</option>
          <option value="professional">Professionnel</option>
        </select>
      </div>
      <div>
        <label>Pays:</label>
        <input 
          type="text" 
          placeholder="Entrez votre pays" 
          value={country} 
          onChange={handleCountryChange} 
        />
      </div>
      <button onClick={handleSubmit}>Soumettre</button>
    </div>
  );
};

export default LandingPage;
