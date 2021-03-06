import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from "@auth0/auth0-react";

// this was taken from Auth0 provider docs

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-kz5f83m7.us.auth0.com"
      clientId="MnA1KYJLjvtjCGuSsWMEZNWFjkfA1IAw"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
