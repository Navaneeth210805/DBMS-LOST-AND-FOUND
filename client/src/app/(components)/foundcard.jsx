import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const handleUpdate = async ({item}) =>{
    try{
        const response = await fetch('http://127.0.0.1:8080/api/update_from_found',{
            method:'POST',
            body : new URLSearchParams({
                email: item.Email,
                phone_no: item.PhoneNo,
                roll_no: item.RollNo,
                location: item.Location,
                ldate: item.DateLost,
                itemtype: item.ItemType,
                itemdescription: item.ItemDescription,
                image : item.Image
            })
        });

        if(response.ok)
        {
            console.log("Removed")
            window.location.reload();

        }
        else
        {
            console.log("Error in removing")
        }
    }
    catch(error)
    {
        console.error(error)
    }
}


const FoundCard = ({ item , rollno}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const copyNumber = () => {
        navigator.clipboard.writeText(item.PhoneNo)
            .then(() => {
                console.log('Phone number copied to clipboard:', item.PhoneNo);
            })
            .catch((error) => {
                console.error('Unable to copy text to clipboard:', error);
            });
    }

    const copyEmail = () => {
        navigator.clipboard.writeText(item.Email)
            .then(() => {
                console.log("Email Copied.");
            })
            .catch((error) => {
                console.error("Unable to copy email.");
            })
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }

        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, [isModalOpen]);

    const handleImageClick = () => {
        toggleModal();
    };


    return (
        <div className='flex flex-col justify-center bg-transparent border-2 backdrop-blur-3xl border-indigo-800 shadow-md shadow-indigo-500/75 p-2 w-100 h-100 lg:w-116 lg:h-116 rounded-xl cursor-pointer'>
            <div className='text-white text-lg flex flex-col justify-center text-center overflow-hidden -z-10'>
                <div className="card-content h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 p-5 z-0">
                    <div className="mb-2 flex flex-row justify-center">
                        <span className="mr-2">Email:</span> <span className='mr-2'>{item.Email}</span>
                        <button type="button" onClick={copyEmail}>
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" onClick={copyNumber} width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="mb-2 flex flex-row justify-center">
                        <span className="mr-2">Phone Number:</span> <span className='mr-2'>{item.PhoneNo}</span>
                        {/* <Image src = "/copybutton.svg" alt = "Copy" width = {5} height = {5}/> */}
                        <button type="button" onClick={copyNumber}>
                            <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" onClick={copyNumber} width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Roll Number:</span> <span>{item.RollNo}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Location:</span> <span>{item.Location}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Date Found:</span> <span>{item.DateLost}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Item Type:</span> <span>{item.ItemType}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Item Description:</span> <span className="break-all">{item.ItemDescription}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-row justify-center'>
                {item.Image ? (
                    <img src={item.Image} alt="No Image Uploaded" className="mt-1 w-50 h-32 flex justify-center cursor-pointer" onClick={handleImageClick} />
                ) : (
                    <div className="mt-3 flex justify-center text-white w-full h-32">No Image Uploaded</div>
                )}
                {isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50 text-white" onClick={toggleModal}>
                        <img src={item.Image} alt="No Image Uploaded" className="text-white" />
                    </div>
                )}
            </div>
            {item.RollNo == rollno || rollno=="admin" ?(
            <div 
            className='flex flex-row justify-center'>
                <button className='m-2 bg-indigo-500 p-2 rounded-lg text-white font-bold' onClick={() => handleUpdate({item})}>Update Status</button>
                <button className='m-2 bg-indigo-500 p-2 rounded-lg text-white font-bold'>Alter Details</button>
            </div>
            ) : <div></div>}
        </div>
    );
};

export default FoundCard;
