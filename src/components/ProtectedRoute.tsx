import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  //const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
