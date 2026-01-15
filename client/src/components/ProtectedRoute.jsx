import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // <-- IMPORTANT
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  console.log("ProtectedRoute:", { isAuthenticated, loading });


  return children;
};

export default ProtectedRoute;

