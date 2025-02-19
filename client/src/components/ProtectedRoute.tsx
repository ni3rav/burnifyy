import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/auth/status`, { withCredentials: true })
      .then((res) => setIsAuthenticated(res.data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    ); // Prevents flickering
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
