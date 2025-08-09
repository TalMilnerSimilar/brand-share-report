import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import BrandShareReport from './pages/BrandShareReport'; // Used in routes via ReportRouter
import ReportsHome from './pages/ReportsHome';
import ReportRouter from './pages/ReportRouter';
import NavBar from './components/NavBar';
import BrandHeader from './components/BrandHeader';
import SelectionHeader from './components/SelectionHeader';
import './App.css';

function App() {
  const [selectedDateRange, setSelectedDateRange] = useState('Dec 2024 - Dec 2024');
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="content-wrapper">
          {/* Use selection header on the reports list page, otherwise the report header */}
          <Routes>
            <Route
              path="/reports"
              element={<SelectionHeader />}
            />
            <Route
              path="*"
              element={<BrandHeader selectedDateRange={selectedDateRange} setSelectedDateRange={setSelectedDateRange} />}
            />
          </Routes>
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