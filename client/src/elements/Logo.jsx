import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ size }) => {
  return (
    <Link to="/" className={`${size} self-center whitespace-nowrap  font-semibold dark:text-white`} >
      <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span> Blog
    </Link >
  )
}

export default Logo