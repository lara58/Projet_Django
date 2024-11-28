// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/search">Rechercher</Link></li>
        <li><Link to="/profile">Mon Profil</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
