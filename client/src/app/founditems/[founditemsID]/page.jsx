"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/app/(components)/navbar';
import axios from 'axios';
import FoundCard from '@/app/(components)/foundcard';
import { useSearchParams } from 'next/navigation';

const FoundItems = ({ params }) => {
    const searchparams = useSearchParams()
    const search1 = searchparams.get("rollno");
    const search2 = searchparams.get('item');
    const search3 = searchparams.get('date');
    const [rollsearching, setsearch] = useState("null")
    const [itemsearching, setitem] = useState("null")
    const [datesearching, setdate] = useState("null")
    const [foundItems, setFoundItems] = useState([]);
    useEffect(() => {
        const fetchFoundItems = async (rollsearching, itemsearching, datesearching) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/found_items?rollno=${rollsearching}&item=${itemsearching}&date=${datesearching}`);
                console.log('Fetched data:', response.data.found_item);
                setFoundItems(response.data.found_item);
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };

        fetchFoundItems(search1, search2, search3);
    }, []);

    const handlesubmit = () => {
        const href = `/founditems/${params.founditemsID}?rollno=${rollsearching}&item=${itemsearching}&date=${datesearching}`
        window.location.href = href;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar userID={params.founditemsID} />
            <h2 className='text-white flex justify-center text-5xl mb-8'>Found Items</h2>
            <div className='flex flex-row justify-center bg-white px-2 py-4 rounded-lg w-5/7 shadow-md shadow-indigo-500'>
                <div className='mr-10 ml-10 flex flex-col justify-center items-center'>
                    {rollsearching == "null" ?
                        (<input type="text"
                            value=""
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder='Search by rollno'
                            className="p-2 focus:outline-indigo-800 rounded-lg border-2 border-indigo-300"
                        />) :
                        (<input type="text"
                            value={rollsearching}
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder='Search by rollno'
                            className="p-2 focus:outline-indigo-800 rounded-lg border-2 border-indigo-300"
                        />)
                    }

                </div>
                <div className = "mr-10 ml-10 flex flex-col justify-center items-center">
                    {itemsearching == "null" ?
                        (<input type="text"
                            value=""
                            onChange={(e) => setitem(e.target.value)}
                            placeholder='Search by item type'
                            className="p-2 focus:outline-indigo-800 rounded-lg border-2 border-indigo-300"
                        />) :
                        (<input type="text"
                            value={itemsearching}
                            onChange={(e) => setitem(e.target.value)}
                            placeholder='Search by item type'
                            className="p-2 focus:outline-indigo-800 rounded-lg border-2 border-indigo-300"
                        />)
                    }
                </div>

                <div className = "mr-10 ml-10 flex flex-col justify-center items-center">
                    <input type="date"
                        value={datesearching}
                        onChange={(e) => setdate(e.target.value)}
                        placeholder='Date search'
                        inputMode='numeric'
                        min="1997-01-01"
                        max="2099-12-31"
                        className="p-2 focus:outline-indigo-800 rounded-lg border-2 border-indigo-300"
                    />
                </div>

                <div className = "mr-10 ml-10 flex flex-col justify-center items-center">
                    <button className='p-2 bg-indigo-600 rounded-lg px-4 text-white font-bold focus:bg-white focus:text-black focus:border-2 focus:border-indigo-800' onClick={handlesubmit}>Submit</button>
                </div>
            </div>
            <div className='flex justify-center p-10 mt-10'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-40 place-content-center">
                    {foundItems.map((item, index) => (
                        <div key={index}>
                            <FoundCard item={item} rollno={params.founditemsID} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FoundItems;