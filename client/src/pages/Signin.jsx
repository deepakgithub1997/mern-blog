import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sectionhead from '../elements/Sectionhead';
import Logo from '../elements/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
import OAuth from '../elements/OAuth';

const Signin = () => {
  const [errors, setErrors] = useState({});
  const [formData, setformData] = useState({ email: "", password: "" });
  const { loading, error: ErrorMessage } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputHandler = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (data.success === false) {
          dispatch(signInFailure(data.message));
        }
        if (res.ok) {
          dispatch(signInSuccess(data));
          navigate('/');
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    }
  }

  const validateForm = () => {
    let valid = true;
    const { email, password } = formData;
    const newErrors = {
      email: "",
      password: "",
    };
    if (email.trim() === '') {
      newErrors.email = 'Please Enter Email';
      valid = false;
    }
    if (password.trim() === '') {
      newErrors.password = 'Please Enter Password';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
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
          {
            ErrorMessage && (
              <Alert className="mb-4" color='failure'>{ErrorMessage}</Alert>
            )
          }
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
            <OAuth />
          </form>
          <div className="mt-5">
            <p>Dont Have an account? <Link to='/sign-up' className='text-blue-400'>Sign Up</Link></p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signin