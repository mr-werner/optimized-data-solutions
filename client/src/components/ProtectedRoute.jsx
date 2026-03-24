import { Navigate } from 'react-router-dom';
import { getToken } from '../services/auth';

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}