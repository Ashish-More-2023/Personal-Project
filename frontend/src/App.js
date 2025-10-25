import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import Toast from './components/common/Toast';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import WorkspacesPage from './pages/WorkspacesPage';
import WorkspaceDetailPage from './pages/WorkspaceDetailPage';
import TasksPage from './pages/TasksPage';
import TimelinesPage from './pages/TimelinesPage';
import EventsPage from './pages/EventsPage';
import NotesPage from './pages/NotesPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WorkspaceProvider>
          <Router>
            <Toast />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workspaces"
                element={
                  <ProtectedRoute>
                    <WorkspacesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/workspace/:id"
                element={
                  <ProtectedRoute>
                    <WorkspaceDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <TasksPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/timelines"
                element={
                  <ProtectedRoute>
                    <TimelinesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/events"
                element={
                  <ProtectedRoute>
                    <EventsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <NotesPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </WorkspaceProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
