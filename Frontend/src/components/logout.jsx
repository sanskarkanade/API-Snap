import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth tokens or user data
    localStorage.removeItem("token"); // Example
    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;
