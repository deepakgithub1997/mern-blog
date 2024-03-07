import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [ErrorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const useNav = useNavigate();

  const inputHandler = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          var dubkey = data.message.split("index:")[1].split("dup key")[0].split("_")[0];
          if (dubkey.trim() == "username") {
            return setErrorMessage("Username Exist!");
          }
          if (dubkey.trim() == "email") {
            return setErrorMessage("Emial Exist!");
          }
          return setErrorMessage(data.message);
        }
        setLoading(false);
        if (res.ok) {
          useNav('/sign-in');
        }
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    }
  }

  const validateForm = () => {
    let valid = true;
    const { username, email, password } = formData;
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };
    if (username.trim() === '') {
      newErrors.username = 'Please Enter Username';
      valid = false;
    }
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
        <div className="flex-1 w-full">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your Username" />
              <TextInput type='text' placeholder='username' id="username" onChange={inputHandler} />
              {errors.username && <span className="text-red-600 text-sm">{errors.username}</span>}
            </div>
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
                ) : "Sign up"
              }
            </Button>
          </form>
          <div className="mt-5">
            <p>Have an account? <Link to='/signin' className='text-blue-400'>Sign in</Link></p>
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

export default Signup