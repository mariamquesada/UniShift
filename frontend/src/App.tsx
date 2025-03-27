import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import ErrorBoundary from './components/ErrorBoundary';

// Loading Components
const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
);

// Lazy Components
const withSuspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  </Suspense>
);

// Pages
const EmployerLogin = withSuspense(React.lazy(() => import('./pages/EmployerLogin')));
const EmployeeLogin = withSuspense(React.lazy(() => import('./pages/EmployeeLogin')));
const EmployerRegister = withSuspense(React.lazy(() => import('./pages/EmployerRegister')));
const EmployeeRegister = withSuspense(React.lazy(() => import('./pages/EmployeeRegister')));
const EventList = withSuspense(React.lazy(() => import('./pages/EventList')));
const EventDetails = withSuspense(React.lazy(() => import('./pages/EventDetails')));
const EmployerDashboard = withSuspense(React.lazy(() => import('./pages/EmployerDashboard')));
const Layout = withSuspense(React.lazy(() => import('./components/Layout')));



function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={Layout}>
              <Route path="/" element={<Navigate to="/employee/login" replace />} />
              <Route path="/employer/login" element={EmployerLogin} />
              <Route path="/employer/register" element={EmployerRegister} />
              <Route path="/employee/login" element={EmployeeLogin} />
              <Route path="/employee/register" element={EmployeeRegister} />
              <Route path="/events" element={EventList} />
              <Route path="/events/:id" element={EventDetails} />
              <Route path="/employer/dashboard" element={EmployerDashboard} />
            </Route>
          </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
