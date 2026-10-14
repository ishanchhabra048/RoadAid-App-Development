import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import { LandingPage } from './pages/LandingPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { MechanicPlaceholderPage } from './pages/MechanicPlaceholderPage';

export function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Screen 1: Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Screen 2: User Dashboard (Bento Grid) */}
          <Route path="/dashboard" element={<UserDashboardPage />} />

          {/* Placeholder Route for Mechanic Dashboard (Phase 2) */}
          <Route path="/mechanic" element={<MechanicPlaceholderPage />} />

          {/* Fallback to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
