import React from 'react';
import Link from 'next/link';
import Navbar from '@/app/(components)/navbar';

const Formstab = ({ params }) => {
    console.log(params)
    return (
        <>
            <Navbar userID={params.formsID} />
            <div className='flex flex-col justify-center items-center h-screen mt-10'>
                <div className='text-5xl text-indigo-500 mt-6'>FORMS</div>
                <div className='text-white text-3xl m-10'>
                    <div>Let others on this platform know that you've lost an item.</div>
                    <div>Go to the <Link className="text-indigo-300 transition duration-0 underline underline-offset-2 hover:duration-300 hover:underline hover:underline-offset-4 hover:decoration-indigo-300 " href="/lostforms">Lost Forms</Link> to upload it.</div>
                    <div className='text-xl'>
                        Provide details such as:
                        <ul className='list-disc'>
                            <li>Item Type</li>
                            <li>Item Description</li>
                            <li>Location where you may have lost the item</li>
                            <li>Approximate date when the item was lost</li>
                            <li>Your personal contact details for others to reach out to you if they find your item</li>
                        </ul>
                    </div>
                </div>
                <div className='text-white text-3xl m-10'>
                    <div>Let others on this platform know that you've found an item.</div>
                    <div>Go to the <Link className="text-indigo-300 transition duration-0 underline underline-offset-2 hover:duration-300 hover:underline hover:underline-offset-4 hover:decoration-indigo-300" href="/foundforms">Found Forms</Link> to upload it.</div>
                    <div className='text-xl'>
                        Provide details such as:
                        <ul className='list-disc'>
                            <li>Item Type</li>
                            <li>Item Description</li>
                            <li>Location where you found the item</li>
                            <li>Approximate date when the item was found</li>
                            <li>Your personal contact details for others to reach out to you if the item belongs to them</li>
                        </ul>
                    </div>
                </div>
                <Link className='mb-6' href={"/home"}>
                    <button className="w-full py-2 px-4 bg-indigo-600 text-xl font-medium text-white rounded-lg hover:bg-purple-700 hover:text-white focus:outline-none p-3 my-2">
                        GO BACK TO HOMEPAGE
                    </button>
                </Link>
            </div>
        </>
    );
};

export default Formstab;
