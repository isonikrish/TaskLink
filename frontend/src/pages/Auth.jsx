import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login'

function Auth() {
  const [authMethod, setAuthMethod] = useState('login')
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