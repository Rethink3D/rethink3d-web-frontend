import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { PrinterLoader } from "../ui/PrinterLoader";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <PrinterLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
