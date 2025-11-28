import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { WardrobeProvider } from './context/WardrobeContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { Scan } from './pages/Scan';
import { Occasion } from './pages/Occasion';
import { Recommendations } from './pages/Recommendations';
import { Wardrobe } from './pages/Wardrobe';
import { Profile } from './pages/Profile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WardrobeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/scan"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Scan />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/occasion"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Occasion />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/recommendations"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Recommendations />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wardrobe"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Wardrobe />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </BrowserRouter>
        </WardrobeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
