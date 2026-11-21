 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

/**
 * React component: `ProtectedRoute`.
 * User authentication check karke admin-only routes ko allow ya login page par redirect karta hai.
 * Example: `<ProtectedRoute />`
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/");  
    }
  }, [user, navigate]);   
 
  if (!user || user.role !== "recruiter") {
    return null;   
  }

  return <>{children}</>;   
};

export default ProtectedRoute;