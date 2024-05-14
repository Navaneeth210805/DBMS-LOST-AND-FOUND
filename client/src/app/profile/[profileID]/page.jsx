import React from 'react'
import Navbar from '@/app/(components)/navbar'

const Profile = ( {params} ) => {
  return (
    <main>
        <Navbar userID={params.profileID}/>
        <div className='text-4xl flex flex-row justify-center h-screen'>
            Profile of {params.profileID}
        </div>
    </main>
  )
}

export default Profile