// src/components/Carousel.js
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
  },
  carousel: {
    margin: '0 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#39ff14',
    color: 'white',
    border: 'none',
    padding: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default Carousel;
