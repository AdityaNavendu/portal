import { JOB_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
/**
 * React hook: `Getalljob`.
 * Axios se `/getalljobs` call karke jobs ko AppContext mein set karta hai aur loading/error return karta hai.
 * Example: `Getalljob(actual arguments);`
 */
function Getalljob(keyword = "") {
  const { setAllJobs } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

        /**
         * Function: `fetchAllJobs`.
         * Axios se jobs API call chalata hai aur result ko context/state mein store karta hai.
         * Example: `fetchAllJobs(actual arguments);`
         */
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
