import { JOB_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
function Getalljob(keyword = "") {
  const { setAllJobs } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      setAllJobs([]);
      try {
        const res = await axios.get(`${JOB_API_URL}/getalljobs`, {
          params: { keyword },
          withCredentials: true,
          signal: controller.signal,
        });

        if (res.data?.success) {
          setAllJobs(Array.isArray(res.data.jobs) ? res.data.jobs : []);
        } else {
          setAllJobs([]);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setAllJobs([]);
          setError(err);
          console.error(err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAllJobs();

    return () => controller.abort();
  }, [keyword, setAllJobs]);

  return { loading, error };
}

export default Getalljob;
