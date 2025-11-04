// src/services/locationService.js
import axios from 'axios';

export const fetchNearbyBloodBanks = async (lat, lng) => {
  try {
    const response = await axios.get(`/api/bloodbanks/nearby?longitude=${lng}&latitude=${lat}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching nearby blood banks:', error);
    throw error;
  }
};

export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      }
    );
  });
};