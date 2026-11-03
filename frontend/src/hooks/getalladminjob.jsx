import { JOB_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
function useGetalladminjob() {
  const { setAllAdminJobs } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
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

