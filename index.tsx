import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * Entry Point
 * 
 * This file is the entry point of the React application.
 * It finds the root DOM element and mounts the React application into it.
 */

// Get the DOM element with the id 'root' where the React app will be mounted.
const rootElement = document.getElementById('root');

// Safety check: Ensure the root element exists before attempting to mount.
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create a React root for the application using the new React 18 API.
const root = ReactDOM.createRoot(rootElement);

// Render the App component within React.StrictMode.
// StrictMode enables additional checks and warnings during development.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);