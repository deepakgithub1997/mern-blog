import React from 'react'

const Sectionhead = ({ text, element }) => {
  return (
    <h2 className='mx-auto text-3xl font-extrabold mb-3 text-center 
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  
    inline-block text-transparent bg-clip-text uppercase'>{text}</h2>
  )
}

export default Sectionhead