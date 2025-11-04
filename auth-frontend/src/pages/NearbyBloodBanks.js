// src/pages/NearbyBloodBanks.js
import React, { useState, useEffect } from 'react';
import { fetchNearbyBloodBanks, getUserLocation } from '../services/locationService';

const NearbyBloodBanks = () => {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { latitude, longitude } = await getUserLocation();
        const banks = await fetchNearbyBloodBanks(latitude, longitude);
        setBloodBanks(banks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading nearby blood banks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="nearby-blood-banks">
      <h2>Nearby Blood Banks</h2>
      <ul>
        {bloodBanks.map(bank => (
          <li key={bank._id}>
            <h3>{bank.name}</h3>
            <p>Distance: {bank.distance} km</p>
            <p>Address: {bank.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyBloodBanks;