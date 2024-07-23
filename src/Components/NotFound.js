import React from 'react';
import './NotFound.css'; // Ensure the CSS file is correctly named and located

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Page Not Found</p>
    </div>
  );
}
