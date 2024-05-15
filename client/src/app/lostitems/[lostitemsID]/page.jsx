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
    
    <div className=''>
      <div>
      {rollsearching=="null" ?
        (<input type="text"
        value =""
        onChange={(e)=>setsearch(e.target.value)} 
        placeholder='Search for rollno'       
      />):
        (<input type="text"
        value ={rollsearching}
        onChange={(e)=>setsearch(e.target.value)} 
        placeholder='Search for rollno'       
        />)
      }
      
      </div>
      <div>
      {itemsearching=="null" ?
        (<input type="text"
        value =""
        onChange={(e)=>setitem(e.target.value)} 
        placeholder='Search for item'       
      />):
        (<input type="text"
        value ={itemsearching}
        onChange={(e)=>setitem(e.target.value)} 
        placeholder='Search for item'       
        />)
      }
      </div>

      <div>
        <input type="date"
         value = {datesearching}
         onChange={(e)=>setdate(e.target.value)}
         placeholder='Date search'
         inputMode='numeric'
         min="1997-01-01"
         max="2099-12-31"
         />
      </div>

      <div>
          <button onClick={handlesubmit}>Submit</button>
      </div>

      <Navbar userID = {params.lostitemsID}/>
      <h2 className='text-white flex justify-center text-5xl'>Lost Items</h2>
      <div className='flex justify-center p-10 mt-28'>
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
