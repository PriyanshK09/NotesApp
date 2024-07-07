import React from 'react';
import './App.css';

function App() {
  return (
    <div className="login-container">
      <div className="login-left">
        <img src="illustration.png" alt="Illustration" className="illustration" />
        <h1>Keep life simple</h1>
        <p>Store all your notes in a simple and intuitive app that helps you enjoy what is most important in life.</p>
      </div>
      <div className="login-right">
        <div className="login-header">
          <img src="logo.png" alt="Logo" className="logo" />
          <h1>NOTE.me</h1>
        </div>
        <button className="google-login">Join with Google</button>
        <div className="separator">
          <span>or join anonymously</span>
        </div>
        <input type="text" placeholder="Type your secret codename" className="codename-input" />
        <button className="anonymous-login">Join anonymously</button>
      </div>
    </div>
  );
}

export default App;
