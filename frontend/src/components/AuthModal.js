import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthModal = ({ type, onClose, onSwitch }) => {
  const { loginWithRedirect } = useAuth0();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Use Auth0's loginWithRedirect for authentication
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: type === 'signup' ? 'signup' : 'login',
          login_hint: formData.email,
          redirect_uri: window.location.origin
        }
      });
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDirectLogin = async (authType) => {
    try {
      await loginWithRedirect({
        authorizationParams: {
          screen_hint: authType,
          redirect_uri: window.location.origin
        }
      });
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <h2>{type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
        
        {/* Direct Auth0 Login Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => handleDirectLogin(type === 'signup' ? 'signup' : 'login')}
            className="submit-btn"
            style={{ marginBottom: '10px' }}
          >
            {type === 'signin' ? 'Sign In with Auth0' : 'Sign Up with Auth0'}
          </button>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          margin: '20px 0',
          color: 'rgba(255,255,255,0.7)'
        }}>
          - OR -
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="careers@fidenz.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Pass#fidenz"
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {type === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-switch">
          {type === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => onSwitch('signup')}>
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => onSwitch('signin')}>
                Sign in here
              </button>
            </p>
          )}
        </div>
        
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '8px',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          <strong>Test Credentials:</strong><br/>
          Email: careers@fidenz.com<br/>
          Password: Pass#fidenz
        </div>
      </div>
    </div>
  );
};

export default AuthModal;