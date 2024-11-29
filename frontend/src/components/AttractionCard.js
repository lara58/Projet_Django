// src/components/AttractionCard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AttractionCard = ({ attraction }) => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/photos/${attraction.location_id}/`);
        if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
          setImage(response.data.data[0].images.medium.url);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching attraction images:', error);
      }
    };

    fetchImage();
  }, [attraction.location_id]);

  const handleViewDetails = () => {
    navigate(`/attraction/${attraction.location_id}`);
  };

  return (
    <div className="attraction-card">
      <h3>{attraction.name}</h3>
      <p>{attraction.address_obj.address_string}</p>
      {attraction.address_obj.street1 && <p>{attraction.address_obj.street1}</p>}
      {attraction.address_obj.street2 && <p>{attraction.address_obj.street2}</p>}
      {attraction.address_obj.city && <p>{attraction.address_obj.city}</p>}
      {attraction.address_obj.postalcode && <p>{attraction.address_obj.postalcode}</p>}
      {attraction.address_obj.country && <p>{attraction.address_obj.country}</p>}
      {image && (
        <div className="attraction-image">
          <img src={image} alt={attraction.name} />
        </div>
      )}
      <button onClick={handleViewDetails}>Voir plus</button>
    </div>
  );
};

export default AttractionCard;
