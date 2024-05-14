"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/(components)/navbar';
import axios from 'axios';

const Profile = ({ params }) => {
	const [profiledetails, setProfile] = useState([]);
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(`http://127.0.0.1:8080/api/profile`);
				console.log(response);
				setProfile(response.data.profile_table);
				// if (response.data.profile_table.length > 0) {
				// 	let obj = response.data.profile_table;
				// 	obj.forEach((elt) => {
				// 		console.log(Object.values(elt));
				// 	})
				// }
			} catch (error) {
				console.error('Error fetching profile: ', error);
			}
		};

		fetchProfile();
	}, [params.profileID]);
	let array = []
	console.log("Current User Details : ", profiledetails);
	let obj = profiledetails;
	obj.forEach((elt) => {
		if (Object.values(elt).at(-1) === params.profileID) {
			array = Object.values(elt);
		}
	})

	console.log(array);
	return (
		<main>
			<Navbar userID={params.profileID} />
			<div className='text-3xl text-white flex flex-col items-center h-screen'>
				<div className='m-14'>
					YOUR PROFILE
				</div>
				<div className='flex flex-col'>
					<h1 className='m-2 p-2'>EMAIL : {array[0]}</h1>
					<h1 className='m-2 p-2'>FIRST NAME : {array[1]}</h1>
					<h1 className='m-2 p-2'>LAST NAME : {array[2]}</h1>
					<h1 className='m-2 p-2'>MIDDLE NAME : {array[3]}</h1>
					<h1 className='m-2 p-2'>MOBILE NUMBER : {array[4]}</h1>
					<h1 className='m-2 p-2'>ROLL NUMBER : {array[5]}</h1>
				</div>
			</div>
		</main>
	);
};

export default Profile;
