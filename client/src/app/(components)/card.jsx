"use client"
import React, { useState } from 'react';

const Card = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className='bg-white p-4 w-70 h-70 lg:w-96 h-96 rounded-xl cursor-pointer' onClick={toggleModal}>
      <div>
        <div>Email: {item.Email}</div>
        <div>Phone Number: {item.PhoneNo}</div>
        <div>Roll Number: {item.RollNo}</div>
        <div>Location: {item.Location}</div>
        <div>Date Lost: {item.DateLost}</div>
        <div>Item Type: {item.ItemType}</div>
        <div>Item Description: {item.ItemDescription}</div>
        {item.Image ? (
          <img src={item.Image} alt="Lost item" className="mt-6 w-80 h-32 flex justify-center" />
        ) : (
          <div className="mt-4 flex justify-center">No Image Uploaded</div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50" onClick={toggleModal}>
          <img src={item.Image} alt="Lost item" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};

export default Card;
