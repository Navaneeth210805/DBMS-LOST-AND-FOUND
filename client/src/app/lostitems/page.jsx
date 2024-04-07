"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/lost_items');
        console.log('Fetched data:', response.data);
        if (Array.isArray(response.data.lost_items)) {
          setLostItems(response.data.lost_items);
        } else {
          console.error('Data is not an array:', response.data.lost_items);
        }
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div className='text-white'>
      <h2>Lost Items</h2>
      <ul>
        {lostItems.map((item, index) => (
          <li key={index}>{item.email}</li> // Assuming each item has a "name" property
        ))}
      </ul>
    </div>
  );
};

export default LostItems;
