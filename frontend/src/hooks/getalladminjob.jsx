import { JOB_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setalladminjobs } from '@/redux/jobslice';
import { useState } from 'react';
function useGetalladminjob() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Run twice on mount to avoid cases where the list navigates before GET finishes
  useEffect(() => {
    const fetchAlladminJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_URL}/getadminjobs`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setalladminjobs(res.data.jobs));
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
  }, [dispatch]);

  return { loading, error };
}

export default useGetalladminjob;


