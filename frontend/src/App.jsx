import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import QuizForm from './pages/QuizForm';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPanel from './admin/AdminPanel';
import MarketIntelligence from './pages/MarketIntelligence';
import ResumeInsight from './pages/ResumeInsight';
import CareerRoadmap from './pages/CareerRoadmap';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

import { PredictionProvider, usePrediction } from './context/PredictionContext';

// Loading spinner for route transitions
function RouteLoadingSpinner({ message }) {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#111624] min-h-screen">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
          <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-display font-bold text-white mb-2">{message || 'Loading...'}</h3>
          <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Please wait</p>
        </div>
      </div>
    </div>
  );
}

// Protected Route wrapper
function ProtectedRoute({ children, requirePrediction = false }) {
  const { isAuthenticated, user } = useAuth();
  const { predictionData, isSubmitting } = usePrediction();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is admin, don't force prediction flow
  if (user?.role === 'admin') {
    return children;
  }

  // If a form submission is in progress (data is being fetched),
  // show a loading state instead of redirecting away.
  if (requirePrediction && isSubmitting) {
    return <RouteLoadingSpinner message="Analyzing Your Profile..." />;
  }

  // Only redirect if we genuinely have no prediction data and
  // we're NOT in the middle of a submission cycle.
  if (requirePrediction && !predictionData && !isSubmitting) {
    return <Navigate to="/form" replace />;
  }

  return children;
}

// Dedicated Admin Route
function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // user is null while the /me fetch is still in-flight after a page reload.
  // Show a loading state instead of prematurely redirecting an admin to /dashboard.
  if (!user) {
    return <RouteLoadingSpinner message="Verifying Credentials..." />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const appRoutes = ['/dashboard', '/history', '/settings', '/admin', '/market', '/resume', '/roadmap'];
  const isAppView = appRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-on-background font-body selection:bg-primary-container selection:text-background flex flex-col">
      {!isAppView && <Navbar />}
      <main className="w-full flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          <Route 
            path="/form" 
            element={
              <ProtectedRoute>
                <QuizForm />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requirePrediction={true}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/market" 
            element={
              <ProtectedRoute requirePrediction={true}>
                <MarketIntelligence />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/resume" 
            element={
              <ProtectedRoute requirePrediction={true}>
                <ResumeInsight />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/roadmap" 
            element={
              <ProtectedRoute requirePrediction={true}>
                <CareerRoadmap />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <PredictionProvider>
          <AppContent />
        </PredictionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
