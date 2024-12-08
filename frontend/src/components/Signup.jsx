import React, { useState } from 'react';
import { useMainContext } from '../contexts/MainContext';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Signup({ setAuthMethod }) {
  const { handleSignup } = useMainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSignup(formData, setIsLoading);
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen p-4'>
      <form className='text-center shadow-lg p-10 border border-[#5f5f5f] rounded-lg max-w-lg w-full' onSubmit={handleSubmit}>
        <h1 className="text-4xl font-semibold text-white mb-6">Create Account</h1>
        <p className="text-lg text-gray-300 mb-6">Please enter your username, email, and password to signup.</p>

        <label className="input input-bordered flex items-center gap-2 mb-5 w-full">
          <input type="text" className="w-full md:w-[300px]" placeholder="Username" name='username' value={formData.username} required onChange={handleChange} />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-5 w-full">
          <input type="text" className="w-full md:w-[300px]" placeholder="Email" name='email' value={formData.email} required onChange={handleChange} />
        </label>

        <label className="input input-bordered flex justify-between items-center gap-2 w-full">
          {passwordShow ? 
            <>
              <input type="text" className="w-full md:w-[300px]" placeholder='*****' name='password' value={formData.password} required onChange={handleChange} />
              <FaRegEyeSlash onClick={() => setPasswordShow(!passwordShow)} className='cursor-pointer select-none' />
            </> :
            <>
              <input type="password" className="w-full md:w-[300px]" placeholder='*****' name='password' value={formData.password} required onChange={handleChange} />
              <FaRegEye onClick={() => setPasswordShow(!passwordShow)} className='cursor-pointer select-none' />
            </>
          }
        </label>

        {isLoading ? 
          <button className="btn mt-4 w-full md:w-[330px]">
            <span className="loading loading-spinner"></span>
            loading
          </button> : 
          <button className="btn mt-4 w-full md:w-[330px]">Signup</button>
        }

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
  );
}

export default Signup;
