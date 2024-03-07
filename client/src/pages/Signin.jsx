import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sectionhead from '../elements/Sectionhead';
import Logo from '../elements/Logo';

const Signin = () => {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [ErrorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const inputHandler = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <div className="py-10 min-h-0 flex md:min-h-screen md:py-5">
      <div className="flex items-center p-3 max-w-3xl mx-auto flex-col md:flex-row gap-4">
        {/* LEFT */}
        <div className="flex-1">
          <Logo size="text-4xl" />
          <p className='text-sm mt-5'>This is a demo project. You can sign in with your email and password or with Google.</p>
        </div>
        {/* RIGHT */}
        <div className="flex-1 w-full">
          <Sectionhead text="Login" element="h1" />
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Email" />
              <TextInput type='email' placeholder='name@company.com' id="email" onChange={inputHandler} />
              {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
            </div>
            <div className="">
              <Label value="Your Password" />
              <TextInput type='password' placeholder='password' id="password" onChange={inputHandler} />
              {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : "Sign in"
              }
            </Button>
          </form>
          <div className="mt-5">
            <p>Dont Have an account? <Link to='/sign-up' className='text-blue-400'>Sign Up</Link></p>
          </div>
          {
            ErrorMessage && (
              <Alert className="mt-4" color='failure'>{ErrorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Signin