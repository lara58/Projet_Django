import axios from 'axios';

// Fonction pour récupérer les avis d'une attraction
export const fetchAttractionReviews = async (locationId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/reviews/${locationId}/`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
        throw error;
    }
};

// Fonction pour récupérer les détails d'une attraction
export const fetchAttractionDetails = async (locationId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/attractions/${locationId}/`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'attraction:", error);
        throw error;
    }
};
