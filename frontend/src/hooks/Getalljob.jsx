import { JOB_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setallJobs } from '@/redux/jobslice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
function Getalljob(props = {}) {
  const { keyword = "" } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { searchquery } = useSelector((state) => state.jobs);

  const effectiveKeyword = keyword || searchquery || "";

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_URL}/getalljobs`, {
          params: { keyword: effectiveKeyword },
          withCredentials: true,
        });


        if (res.data?.success) {
          dispatch(setallJobs(res.data.jobs));
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch, effectiveKeyword]);

  return { loading, error };
}

export default Getalljob;


