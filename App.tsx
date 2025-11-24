import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

/**
 * App Component
 * 
 * The main component of the application. It sets up the routing,
 * global layout, and theme context for the entire app.
 * 
 * Features:
 * - Wraps the application in BrowserRouter for client-side routing.
 * - Applies global styles for dark mode and selection colors.
 * - Includes the Navbar component which is persistent across all pages.
 * - Defines the main routes of the application.
 */
function App() {
  return (
    // Router provider to enable navigation and URL handling
    <Router>
      {/* 
        Main container with global styles:
        - min-h-screen: Ensures the app takes up at least the full viewport height.
        - bg-white dark:bg-zinc-950: Sets the background color for light and dark modes.
        - text-zinc-900 dark:text-white: Sets the text color for light and dark modes.
        - selection:bg-red-500: Customizes the text selection background color.
        - transition-colors: Enables smooth transitions when switching themes.
      */}
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-red-500 selection:text-white font-sans overflow-x-hidden transition-colors duration-300">

        {/* Persistent Navigation Bar */}
        <Navbar />

        {/* 
          Main Content Area 
          - pt-24: Adds padding top to account for the fixed navbar.
          - relative: Positions content relative to this container.
          - max-w-[100vw]: Prevents horizontal overflow.
        */}
        <main className="pt-24 relative w-full max-w-[100vw] overflow-hidden">
          <Routes>
            {/* 
              Route Definitions:
              - /: Renders the Home component (Single Page Application style).
              - *: Catch-all route that redirects to Home for any unknown paths.
            */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;