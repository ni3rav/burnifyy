import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/auth/status`, { withCredentials: true })
      .then((res) => {
        if (!res.data.authenticated) {
          navigate("/"); // Redirect back to home if not authenticated
        }
      });

    axios
      .get(`${VITE_BACKEND_URL}/user/data`, { withCredentials: true }) // Example API call
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <pre className="mt-4">{JSON.stringify(userData, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;
