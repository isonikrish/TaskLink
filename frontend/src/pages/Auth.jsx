import React, { useEffect, useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'
import { useNavigate } from 'react-router-dom';
import { useMainContext } from '../contexts/MainContext';

function Auth() {
  const [authMethod, setAuthMethod] = useState('login')
  const navigate = useNavigate();
  const { isUserThere } = useMainContext();

  useEffect(() => {
    if (isUserThere) {
      navigate('/dashboard')
    }
  }, [navigate, isUserThere]);
  return (
    <div>
      {authMethod === "signup" ? (
        <Signup setAuthMethod={setAuthMethod} />
      ) : (
        <Login setAuthMethod={setAuthMethod} />
      )}

    </div>
  )
}

export default Auth