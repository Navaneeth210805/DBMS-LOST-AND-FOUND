"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../(components)/navbar';
import Card from '../(components)/card';

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
    <div className=''>
      <Navbar/>
      <h2 className='text-white flex justify-center text-5xl'>Lost Items</h2>
      <div className='flex justify-center p-10 mt-28'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-40 place-content-center">
        {lostItems.map((item, index) => (
          <div key={index}>
            <Card item={item} />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
  
};

export default LostItems;
