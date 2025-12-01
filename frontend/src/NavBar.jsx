import React from 'react'
import pic from './assets/to-do-list.png'
const NavBar = () => {
  return (
    <div className='bg-stone-600 text-white font-medium font-arial px-3 py-5 border-b-2 border-gray-500 flex flex-row justify-between items-center'>
        <div className='flex gap-3 items-center'>
            <img src={pic} alt="logo" className='size-10' />
            <h1 className='text-3xl'>Get It Done.</h1>
        </div>

    </div>
  )
}

export default NavBar