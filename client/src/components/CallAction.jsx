import { Button } from 'flowbite-react'
import React from 'react'

const CallAction = () => {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-content items-center '>
      <div className='flex-1 flex flex-col justify-center items-center  gap-3'>
        <h2 className='text-xl font-bold'>Want to learn more about Javascript ?</h2>
        <p className='text-gray-500'>
          Checkout these resources with 100 Javascript projects
        </p>
        <Button gradientDuoTone='purpleToPink'><a to="#" target='_blank' rel="noopener noreferrer">Learn More</a></Button>
      </div>
      <div className='flex-1'>
        <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
      </div>
    </div>
  )
}

export default CallAction