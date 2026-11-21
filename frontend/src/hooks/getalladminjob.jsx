/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import { JOB_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
/**
 * React hook ya state helper: `useGetalladminjob`.
 * Shared portal state ko read/update karta hai aur React components ise reuse karte hain.
 * Example: `useGetalladminjob();`
 */
function useGetalladminjob() {
  const { setAllAdminJobs } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    /**
     * React component: `fetchAlladminJobs`.
     * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
     * Example: `<fetchAlladminJobs />`
     */
    const fetchAlladminJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_URL}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          setAllAdminJobs(res.data.jobs);
        }
      } catch (err) {
        setError(err);
        console.log('GET ADMIN JOBS ERROR:', {
          message: err?.response?.data?.message,
          status: err?.response?.status,
          data: err?.response?.data,
          raw: err,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlladminJobs();
    const t = setTimeout(fetchAlladminJobs, 400);
    return () => clearTimeout(t);
  }, [setAllAdminJobs]);

  return { loading, error };
}

export default useGetalladminjob;

