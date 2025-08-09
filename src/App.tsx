import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BrandShareReport from './pages/BrandShareReport';
import { ReportsHome } from './pages';
import ReportRouter from './pages/ReportRouter';
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
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Navigate to="/reports" replace />} />
                <Route path="/reports" element={<ReportsHome />} />
                <Route path="/reports/new" element={<NewReportLazy />} />
                <Route path="/reports/:reportId" element={<ReportRouter />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App; 

// Lazy wrapper to keep imports clean
const NewReportLazy = React.lazy(() => import('./pages/NewReport'));