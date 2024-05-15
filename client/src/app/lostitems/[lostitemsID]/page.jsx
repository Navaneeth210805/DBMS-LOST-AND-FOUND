"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/app/(components)/navbar';
import Card from '@/app/(components)/card';
import { redirect, setLazyProp } from 'next/dist/server/api-utils';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
const LostItems = ( { params}) => {
  const searchparams = useSearchParams()
  const search1 = searchparams.get("rollno");
  const search2 = searchparams.get('item');
  const search3 = searchparams.get('date');
  const [rollsearching , setsearch] = useState("null")
  const [lostItems, setLostItems] = useState([]);
  const [itemsearching,setitem] = useState("null")
  const [datesearching,setdate] = useState("null")
    console.log(params.lostitemsID)
  useEffect(() => {
    const fetchLostItems = async (rollsearching,itemsearching,datesearching) => {
      console.log("Searching :", rollsearching , itemsearching ,datesearching);
      try {
        const response = await axios.post(`http://127.0.0.1:8080/api/lost_items?rollno=${rollsearching}&item=${itemsearching}&date=${datesearching}`);
        console.log('Fetched data:', response.data.lost_item);
        setLostItems(response.data.lost_item);
      } catch (error) {
        console.error('Error fetching lost items:', error);
      }
    };

    fetchLostItems(search1,search2,search3);
  }, []);

  const handlesubmit = () =>{
    const href=`/lostitems/${params.lostitemsID}?rollno=${rollsearching}&item=${itemsearching}&date=${datesearching}`
    window.location.href=href;
  }
  

  return (
    
    <div className='flex flex-col justify-center items-center'>
      <Navbar userID = {params.lostitemsID}/>
      <h2 className='text-white flex justify-center text-5xl mb-8'>Lost Items</h2>
      <div className='flex flex-row justify-center bg-white px-2 py-4 rounded-lg shadow-md shadow-indigo-500 w-5/7'>
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
        {lostItems.map((item, index) => (
          <div key={index}>
            <Card item={item} rollno={params.lostitemsID}/>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
  
};

export default LostItems;
