import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex items-center p-3 max-w-3xl mx-auto flex-col md:flex-row gap-4">
        {/* LEFT */}
        <div className="flex-1">
          <Link to="/" className="self-center whitespace-nowrap text-4xl font-semibold dark:text-white">
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Sahand's</span> Blog
          </Link>
          <p className='text-sm mt-5'>This is a demo project. You can sign up with your email and password or with Google. </p>
        </div>
        {/* RIGHT */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div class="">
              <Label value="Your Username" />
              <TextInput type='text' placeholder='username' id="username" />
            </div>
            <div class="">
              <Label value="Your Email" />
              <TextInput type='email' placeholder='name@company.com' id="email" />
            </div>
            <div class="">
              <Label value="Your Password" />
              <TextInput type='password' placeholder='password' id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink">Sign up</Button>
          </form>
          <div className="mt-5">
            <p>Have an account? <Link className='text-blue-400'>Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup