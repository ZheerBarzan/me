import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import About from './pages/About';
import ExperiencePage from './pages/ExperiencePage';
import WorkPage from './pages/WorkPage';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-red-500 selection:text-white font-sans overflow-x-hidden">
        <Navbar />

        <main className="pt-24 relative w-full max-w-[100vw] overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <AIChat />
      </div>
    </Router>
  );
}

export default App;