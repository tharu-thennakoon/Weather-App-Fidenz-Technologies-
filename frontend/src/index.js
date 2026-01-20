import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-t31t0x4boroxs44x.us.auth0.com"
      clientId="csNJ9vfSEoTgKXQwUc2k83sASGw3tqXx" 
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-t31t0x4boroxs44x.us.auth0.com/api/v2/"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);