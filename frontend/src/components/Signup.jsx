import React, { useState } from 'react'
import { useMainContext } from '../contexts/MainContext';

function Signup({ setAuthMethod }) {
  const { handleSignup } = useMainContext();
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password: "",
  })
  function handleChange(e){
    const {name, value} = e.target;
    setFormData({...formData,[name]: value})
  }
  async function handleSubmit(e) {
    e.preventDefault();
    await handleSignup(formData);
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>

      <form className='text-center' onSubmit={handleSubmit}>

        <h1 className="text-4xl font-semibold text-white mb-6">Create Account</h1> {/* Styled heading */}
        <p className="text-lg text-gray-300 mb-6">Please enter your username, email, and password to signup.</p>

        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input type="text" className="grow w-[300px]" placeholder="Username" name='username' value={formData.username} required onChange={handleChange}/>
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input type="text" className="grow w-[300px]" placeholder="Email" name='email' value={formData.email} required onChange={handleChange}/>
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input type="password" className="grow w-[300px]" placeholder='*****' name='password' value={formData.password} required onChange={handleChange}/>
        </label>
        <button className="btn mt-4 w-[330px]">Signup</button>
      </form>
      <div className="text-center mt-6">
        <p className="text-gray-300">
          <span className="mr-2">Already have an account?</span>
          <span
            onClick={() => setAuthMethod("login")}
            className="text-blue-500 cursor-pointer hover:underline transition-all duration-300"
          >
            Login here!
          </span>
        </p>
      </div>

    </div>
  )
}

export default Signup;
