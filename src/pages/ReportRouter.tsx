import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BrandShareReport from './BrandShareReport';
import { ReportProvider } from '../context/ReportContext';

const ReportRouter: React.FC = () => {
  const { reportId } = useParams();
  // For now, only a default report is supported; future: load by id
  if (!reportId) return <Navigate to="/reports" replace />;

  return (
    <ReportProvider>
      <BrandShareReport selectedDateRange={'Dec 2024 - Dec 2024'} />
    </ReportProvider>
  );
};

export default ReportRouter;


