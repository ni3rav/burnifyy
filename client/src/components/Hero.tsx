import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const VITE_LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

function Hero() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${VITE_BACKEND_URL}/auth/status`, { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          navigate("/dashboard"); // Redirect if user is logged in
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <a role="button" href={VITE_LOGIN_URL} className="btn btn-primary">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
