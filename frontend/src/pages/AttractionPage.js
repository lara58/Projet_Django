import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../components/StarRating';

const AttractionPage = () => {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAttractionDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/attractions/${id}/`);
        setAttraction(response.data);
      } catch (error) {
        console.error('Error fetching attraction details:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/photos/${id}/`);
        if (response.data && Array.isArray(response.data.data)) {
          setImages(response.data.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching attraction images:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/reviews/${id}/`);
        if (response.data && Array.isArray(response.data.data)) {
          setReviews(response.data.data);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching attraction reviews:', error);
      }
    };

    fetchAttractionDetails();
    fetchImages();
    fetchReviews();
  }, [id]);

  if (!attraction) return <div>Loading...</div>;

  return (
    <div>
      <h1>{attraction.name}</h1>
      <StarRating rating={attraction.rating} />
      <p>{attraction.description}</p>
      <p>Prix: {attraction.price}</p>
      <p>Catégorie: {attraction.category}</p>
      {images.length > 0 && (
        <div className="attraction-images">
          {images.map((image, index) => (
            <img key={index} src={image.images.medium.url} alt={attraction.name} />
          ))}
        </div>
      )}
      {reviews.length > 0 && (
        <div className="attraction-reviews">
          <h2>Reviews</h2>
          {reviews.map((review, index) => (
            <div key={index}>
              <p>{review.text}</p>
              <p>Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={() => console.log('Add to compilation')}>Ajouter à la compilation</button>
    </div>
  );
};

export default AttractionPage;
