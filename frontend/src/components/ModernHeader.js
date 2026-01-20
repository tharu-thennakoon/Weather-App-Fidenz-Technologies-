import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ModernHeader = ({ onOpenSearch }) => {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();

  return (
    <header className="modern-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            
            <h1>WeatherComfort</h1>
          </div>
        </div>

        <div className="header-center">
          <button className="search-trigger" onClick={onOpenSearch}>
            
            <span className="search-text">Search cities...</span>
          </button>
        </div>

        <div className="header-right">
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-avatar">
                {user?.picture ? (
                  <img src={user.picture} alt="User Avatar" />
                ) : (
                  <span>{user?.email?.[0].toUpperCase()}</span>
                )}
              </div>
              <div className="user-dropdown">
                <div className="user-email">{user?.email}</div>
                <button 
                  className="btn-logout"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button 
              className="btn-signin"
              onClick={() => loginWithRedirect()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ModernHeader;
