import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const getSavedUser = () => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) return JSON.parse(savedUser);

  const persistedState = localStorage.getItem("persist:root");
  if (!persistedState) return null;

  const { auth } = JSON.parse(persistedState);
  return auth ? JSON.parse(auth).user ?? null : null;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(getSavedUser);
  const [loading, setLoading] = useState(false);
  const [alljobs, setAllJobs] = useState([]);
  const [singlejob, setSingleJob] = useState(null);
  const [alladminjobs, setAllAdminJobs] = useState([]);
  const [searchjobbyText, setSearchJobByText] = useState("");
  const [allappliedjob, setAllAppliedJob] = useState([]);
  const [searchquery, setSearchQuery] = useState("");
  const [singleCompany, setSingleCompany] = useState({});
  const [companies, setCompanies] = useState([]);
  const [searchCompanyByText, setSearchCompanyByText] = useState("");
  const [allapplications, setAllApplications] = useState({ applicants: [] });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    localStorage.removeItem("persist:root");
  }, [user]);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    alljobs,
    setAllJobs,
    singlejob,
    setSingleJob,
    alladminjobs,
    setAllAdminJobs,
    searchjobbyText,
    setSearchJobByText,
    allappliedjob,
    setAllAppliedJob,
    searchquery,
    setSearchQuery,
    singleCompany,
    setSingleCompany,
    companies,
    setCompanies,
    searchCompanyByText,
    setSearchCompanyByText,
    allapplications,
    setAllApplications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
