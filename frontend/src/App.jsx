import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth';
import { useMainContext } from './contexts/MainContext';
import Dashboard from './pages/Dashboard';
import ProtectRoute from './lib/ProtectRoute'
import Footer from './components/Footer';
function App() {
  const navigate = useNavigate();
  const { isUserThere, tasks } = useMainContext();

  useEffect(() => {
    if (!isUserThere) {
      navigate("/")
    }
  }, [navigate, isUserThere]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        <Route path="/dashboard/:menu" element={<ProtectRoute><Dashboard /></ProtectRoute>} />
        
      </Routes>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
