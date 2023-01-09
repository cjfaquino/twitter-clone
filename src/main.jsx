import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MyFooter from './components/MyFooter/MyFooter';
import App from './App';
import './index.css';
import './firebase-config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <MyFooter />
  </React.StrictMode>
);
