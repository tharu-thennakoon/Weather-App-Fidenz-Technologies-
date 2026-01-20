import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AuthModal from './AuthModal';

const AuthButtons = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('signin');

  const handleLogin = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  if (isAuthenticated) {
    return (
      <div className="user-info">
        {user.picture && (
          <img 
            src={user.picture} 
            alt={user.name}
            className="user-avatar"
          />
        )}
        <span>Welcome, {user.name || user.email}</span>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="auth-buttons">
        <button 
          onClick={() => handleLogin('signin')} 
          className="auth-btn"
        >
          Sign In
        </button>
        <button 
          onClick={() => handleLogin('signup')} 
          className="auth-btn"
        >
          Sign Up
        </button>
      </div>
      
      {showModal && (
        <AuthModal 
          type={modalType}
          onClose={() => setShowModal(false)}
          onSwitch={(type) => setModalType(type)}
        />
      )}
    </>
  );
};

export default AuthButtons;