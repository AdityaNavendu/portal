/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

 
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

/**
 * React component: `ProtectedRoute`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
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