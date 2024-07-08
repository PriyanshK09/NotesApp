// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setLoading }) {
  const [username, setUsername] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setLoading(true);
      setTimeout(() => {
        localStorage.setItem('username', username);
        setLoading(false);
        navigate('/main');
      }, 2000); // Simulate loading delay
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Notes App</h1>
        <form onSubmit={handleLogin}>
          <div className={`input-group ${isFocused || username ? 'focused' : ''}`}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
            />
            <label>Username</label>
          </div>
          <button type="submit" className="login-button">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;