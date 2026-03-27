import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Wait until auth is initialized
  if (loading) {
    return <p>Loading...</p>;
  }

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Authorized
  return children;
}