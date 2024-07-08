// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <Router>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<LoginPage setLoading={setLoading} />} />
        <Route
          path="/main"
          element={
            localStorage.getItem('token') ? (
              <MainPage logout={logout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;