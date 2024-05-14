"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/app/(components)/navbar';
import axios from 'axios';
import FoundCard from '@/app/(components)/foundcard';

const FoundItems = ({params}) => {
    const [foundItems, setFoundItems] = useState([]);
    useEffect(() => {
        const fetchFoundItems = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/api/found_items');
                console.log('Fetched data:', response.data.found_item);
                setFoundItems(response.data.found_item);
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };

        fetchFoundItems();
    }, []);


    return (
        <div className=''>
            <Navbar userID = {params.founditemsID}/>
            <h2 className='text-white flex justify-center text-5xl'>Found Items</h2>
            <div className='flex justify-center p-10 mt-28'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-40 place-content-center">
                    {foundItems.map((item, index) => (
                        <div key={index}>
                            <FoundCard item={item} rollno = {params.founditemsID}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FoundItems;