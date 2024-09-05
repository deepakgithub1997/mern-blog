import React from 'react'
import CallToAction from '../components/CallAction';

const Projects = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex flex-col items-center justify-center gap-5">
      <h1 className='text-3xl font font-semibold text-center my-7 '>Projects</h1>
      <p className='text-center text-md text-gray-500'>Build fun and engaging projects while learning HTML, CSS, and JavaScript!</p>
      <CallToAction />

    </div>
  )
}

export default Projects