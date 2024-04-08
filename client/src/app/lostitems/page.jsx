"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/api/lost_items');
        console.log('Fetched data:', response.data.lost_item);
        setLostItems(response.data.lost_item);
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
        <div key={index}>
            <li>{item.Email}</li>
            {item.Image !== 'null' && (
            <img src={item.Image} alt="Image" />
            )}
        </div>
        ))}

      </ul>
    </div>
  );
  
};

export default LostItems;