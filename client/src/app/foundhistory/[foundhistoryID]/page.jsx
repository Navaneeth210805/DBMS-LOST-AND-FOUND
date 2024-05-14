"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/(components)/navbar';
import LostHistoryCard from '@/app/(components)/lost_history_card';

const LostItemsHistory = ({ params }) => {
  const [foundItemsHistory, setFoundItemsHistory] = useState([]);
  
  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/found_history`);
        console.log('Fetched data:', response.data.found_history);
        setFoundItemsHistory(response.data.found_history);
        console.log(foundItemsHistory);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchLostItems();
  }, [params.foundhistoryID]);

  const filteredFoundItems = foundItemsHistory.filter(item => item.RollNo === params.foundhistoryID);
  console.log(filteredFoundItems)

  return (
    <div className=''>
      <Navbar userID={params.foundhistoryID} />
      <h2 className='text-white flex justify-center text-5xl'>Found History</h2>
      <div className='flex justify-center p-10 mt-28'>
        {filteredFoundItems && filteredFoundItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-40 place-content-center">
            {filteredFoundItems.map((item, index) => (
              <div key={index}>
                <LostHistoryCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <p>No lost items found.</p>
        )}
      </div>
    </div>
  );
};

export default LostItemsHistory;
