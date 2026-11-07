import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { USER_API_URL } from "@/utils/data";

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
  const [user, setUserState] = useState(getSavedUser);
  const userId = user?._id ? String(user._id) : null;
  const [bookmarkState, setBookmarkState] = useState({ userId: null, jobs: [] });
  const [bookmarkFetch, setBookmarkFetch] = useState(() => ({
    userId,
    loading: Boolean(userId),
    error: null,
  }));
  const bookmarkUserIdRef = useRef(userId);
  const bookmarkMutationVersion = useRef(new Map());
  const setUser = (nextUser) => {
    const updatedUser =
      typeof nextUser === "function" ? nextUser(user) : nextUser;
    const updatedUserId = updatedUser?._id
      ? String(updatedUser._id)
      : null;

    if (updatedUserId !== bookmarkUserIdRef.current) {
      bookmarkUserIdRef.current = updatedUserId;
      setBookmarkState({ userId: null, jobs: [] });
      setBookmarkFetch({
        userId: updatedUserId,
        loading: Boolean(updatedUserId),
        error: null,
      });
    }

    setUserState(updatedUser);
  };
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
    let active = true;

    if (!userId) return () => {
      active = false;
    };

    const requestVersion = bookmarkMutationVersion.current.get(userId) || 0;

    axios
      .get(`${USER_API_URL}/bookmarks`, { withCredentials: true })
      .then((res) => {
        if (!res.data?.success) {
          throw new Error(res.data?.message || "Unable to retrieve saved jobs");
        }

        if (active) {
          if (
            (bookmarkMutationVersion.current.get(userId) || 0) ===
            requestVersion
          ) {
            setBookmarkState({
              userId,
              jobs: Array.isArray(res.data.jobs) ? res.data.jobs : [],
            });
          }
          setBookmarkFetch({ userId, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setBookmarkFetch({
            userId,
            loading: false,
            error:
              error.response?.data?.message ||
              error.message ||
              "Unable to retrieve saved jobs",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const savedJobs =
    bookmarkState.userId === userId ? bookmarkState.jobs : [];
  const bookmarkedJobIds = savedJobs.map((job) => String(job._id));
  const bookmarksLoading =
    bookmarkFetch.userId === userId && bookmarkFetch.loading;
  const bookmarksError =
    bookmarkFetch.userId === userId ? bookmarkFetch.error : null;

  const toggleBookmark = async (job) => {
    if (!userId) {
      throw new Error("Please log in to save jobs");
    }

    const jobId = String(typeof job === "string" ? job : job?._id || "");
    if (!jobId) {
      throw new Error("Cannot save a job without an ID");
    }

    const isBookmarked = bookmarkedJobIds.includes(jobId);
    const res = isBookmarked
      ? await axios.delete(`${USER_API_URL}/bookmarks/${jobId}`, {
          withCredentials: true,
        })
      : await axios.post(
          `${USER_API_URL}/bookmarks/${jobId}`,
          {},
          { withCredentials: true },
        );

    if (!res.data?.success) {
      throw new Error(res.data?.message || "Unable to update saved jobs");
    }

    if (bookmarkUserIdRef.current === userId) {
      bookmarkMutationVersion.current.set(
        userId,
        (bookmarkMutationVersion.current.get(userId) || 0) + 1,
      );
      setBookmarkState((current) => {
        const jobs = current.userId === userId ? current.jobs : [];
        return {
          userId,
          jobs: isBookmarked
            ? jobs.filter((savedJob) => String(savedJob._id) !== jobId)
            : jobs.some((savedJob) => String(savedJob._id) === jobId)
              ? jobs
              : [...jobs, res.data.job],
        };
      });
      setBookmarkFetch({ userId, loading: false, error: null });
    }

    return !isBookmarked;
  };

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
    savedJobs,
    bookmarkedJobIds,
    bookmarksLoading,
    bookmarksError,
    toggleBookmark,
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
