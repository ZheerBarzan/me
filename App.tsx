import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-red-500 selection:text-white font-sans overflow-x-hidden transition-colors duration-300">
        <Navbar />

        <main className="pt-24 relative w-full max-w-[100vw] overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;