import React, { useState } from 'react';
import AttractionCard from './AttractionCard';

const Carousel = ({ attractions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % attractions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + attractions.length) % attractions.length);
  };

  return (
    <div style={carouselStyles.container}>
      <button onClick={prevSlide} style={carouselStyles.button}>{"<"}</button>
      <div style={carouselStyles.carousel}>
        <AttractionCard attraction={attractions[currentIndex]} />
      </div>
      <button onClick={nextSlide} style={carouselStyles.button}>{">"}</button>
    </div>
  );
};

const carouselStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    gap: '20px',  // Espacement entre les boutons et le carousel
  },
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: '300px',  // Limite la largeur du carousel
    overflow: 'hidden',  // Masque les éléments qui dépassent du container
    transition: 'transform 0.5s ease',  // Ajoute une transition lors du changement de slide
  },
  button: {
    backgroundColor: '#39ff14',
    color: 'white',
    border: 'none',
    padding: '15px',
    fontSize: '24px',
    cursor: 'pointer',
    borderRadius: '50%',  // Rendre les boutons ronds
    transition: 'background-color 0.3s, transform 0.3s',  // Effet au survol
    width: '50px',
    height: '50px',
  },
  buttonHover: {
    backgroundColor: '#32cc16',
    transform: 'scale(1.1)',  // Agrandir les boutons au survol
  },
};

export default Carousel;
