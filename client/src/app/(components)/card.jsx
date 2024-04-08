import React, { useState, useEffect } from 'react';

const Card = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

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
        <div className='bg-transparent border-2 border-indigo-800 shadow-md shadow-indigo-500/50 p-4 w-100 h-100 lg:w-116 lg:h-116 rounded-xl cursor-pointer'>
            <div className='text-white bg-blur-xl text-lg flex flex-col justify-center text-center overflow-hidden'>
                <div className="card-content h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 p-5">
                    <div className="mb-2">
                        <span className="mr-2">Email:</span> <span>{item.Email}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Phone Number:</span> <span>{item.PhoneNo}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Roll Number:</span> <span>{item.RollNo}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Location:</span> <span>{item.Location}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Date Lost:</span> <span>{item.DateLost}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Item Type:</span> <span>{item.ItemType}</span>
                    </div>
                    <div className="mb-2">
                        <span className="mr-2">Item Description:</span> <span className="break-all">{item.ItemDescription}</span>
                    </div>
                </div>
            </div>
            {item.Image ? (
                <img src={item.Image} alt="Lost item" className="mt-6 w-40 h-32 flex justify-center cursor-pointer" onClick={handleImageClick} />
            ) : (
                <div className="mt-4 flex justify-center text-white w-full h-32">No Image Uploaded</div>
            )}
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50" onClick={toggleModal}>
                    <img src={item.Image} alt="Lost item" className="" />
                </div>
            )}
        </div>
    );
};

export default Card;
