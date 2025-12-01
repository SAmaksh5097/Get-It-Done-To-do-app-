import React from 'react'
import Tasks from './Tasks'
import pic from './assets/pic.png'

const MainPage = () => {
  return (
    <div className='min-h-screen bg-black text-white px-4 py-5 flex flex-col gap-4'>
        <h1 className='text-4xl font-bold '>Remaining Tasks</h1>
        <h2 className='text-gray-300'>Here's what you need to get done.</h2>

        <Tasks/>

        <img src={pic} alt="" className='size-50 self-center rounded-2xl' />
        <h1 className='text-3xl text-gray-200 self-center'>That's it!!! Sit back & relax or add more tasks </h1>
        
    </div>
  )
}

export default MainPage
