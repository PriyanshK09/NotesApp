// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<LoginPage setLoading={setLoading} />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;