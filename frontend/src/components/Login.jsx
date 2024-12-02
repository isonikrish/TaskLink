import React, { useState } from 'react';
import { useMainContext } from '../contexts/MainContext.jsx';

function Login({ setAuthMethod }) {
  const { handleLogin } = useMainContext(); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(formData);
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <form className='text-center' onSubmit={handleSubmit}>
        <h1 className="text-4xl font-semibold text-white mb-4">Enter Credentials</h1>
        <p className="text-lg text-gray-300 mb-6">Please enter your email and password to login.</p> 

        <label className="input input-bordered flex items-center gap-2 mb-5">
          <input 
            type="email" 
            className="grow w-[300px]" 
            placeholder="Email" 
            name='email' 
            value={formData.email} 
            required 
            onChange={handleChange} 
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input 
            type="password" 
            className="grow w-[300px]" 
            placeholder='*****' 
            name='password' 
            value={formData.password} 
            required 
            onChange={handleChange} 
          />
        </label>

        <button type="submit" className="btn mt-4 w-[330px]">Login</button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-300">
          <span className="mr-2">Don't have an account?</span>
          <span
            onClick={() => setAuthMethod("signup")}
            className="text-blue-500 cursor-pointer hover:underline transition-all duration-300"
          >
            Signup here!
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
