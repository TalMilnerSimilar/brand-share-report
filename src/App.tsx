import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BrandShareReport from './pages/BrandShareReport';
import ReportsHome from './pages/ReportsHome';
import NavBar from './components/NavBar';
import BrandHeader from './components/BrandHeader';
import './App.css';

function App() {
  const [selectedDateRange, setSelectedDateRange] = useState('Dec 2024 - Dec 2024');
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content-wrapper">
          <BrandHeader selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ReportsHome />} />
              <Route path="/brand-share" element={<BrandShareReport selectedDateRange={selectedDateRange} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 