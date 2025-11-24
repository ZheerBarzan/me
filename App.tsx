import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-500 selection:text-white font-sans overflow-x-hidden">
        <Navbar />

        <main className="pt-24 relative w-full max-w-[100vw] overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <AIChat />
      </div>
    </Router>
  );
}

export default App;