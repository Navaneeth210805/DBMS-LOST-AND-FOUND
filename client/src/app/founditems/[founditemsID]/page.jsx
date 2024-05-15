"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '@/app/(components)/navbar';
import axios from 'axios';
import FoundCard from '@/app/(components)/foundcard';
import { useSearchParams } from 'next/navigation';

const FoundItems = ({params}) => {
    const searchparams = useSearchParams()
    const search1 = searchparams.get("rollno");
    const search2 = searchparams.get('item');
    const search3 = searchparams.get('date');
    const [rollsearching , setsearch] = useState("null")
    const [itemsearching,setitem] = useState("null")
    const [datesearching,setdate] = useState("null")
    const [foundItems, setFoundItems] = useState([]);
    useEffect(() => {
        const fetchFoundItems = async (rollsearching,itemsearching,datesearching) => {
            try {
                const response = await axios.get(`http://127.0.0.1:8080/api/found_items?rollno=${rollsearching}&item=${itemsearching}&date=${datesearching}`);
                console.log('Fetched data:', response.data.found_item);
                setFoundItems(response.data.found_item);
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };

        fetchFoundItems(search1,search2,search3);
    }, []);

    const handlesubmit = () =>{
        const href=`/founditems/${params.founditemsID}?rollno=${rollsearching}&item=${itemsearching}&date=${datesearching}`
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