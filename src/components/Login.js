import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';  

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (isAdminMode && username === 'admin' && password === 'password') {
      onLogin(true, true);  
      navigate('/dashboard');
    } else if (!isAdminMode && username === 'user' && password === 'password') {
      onLogin(true, false);  
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
    setError('');
  };

  return (
    <div className={`login-container ${isAdminMode ? 'admin-mode' : ''}`}>
      <div className="top-right">
        <button onClick={toggleAdminMode}>
          {isAdminMode ? 'Switch to User' : 'Switch to Admin'}
        </button>
      </div>
      <h2>{isAdminMode ? 'Admin Login' : 'User Login'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isAdminMode ? 'Login as Admin' : 'Login as User'}</button>
      </form>
    </div>
  );
};

export default Login;
