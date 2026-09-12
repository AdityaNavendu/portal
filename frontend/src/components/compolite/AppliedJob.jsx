import '../../styles/appliedjob.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { APPLICATION_API_URL } from '@/utils/data';
import { setallappliedjob } from '@/redux/jobslice';

const AppliedJob = () => {
  const dispatch = useDispatch();
  const { allappliedjob } = useSelector((state) => state.jobs);

  useEffect(() => {
    const fetchAllAppliedJob = async () => {
      try {
        // backend route: GET /api/applicants/get
        const res = await axios.get(`${APPLICATION_API_URL}/get`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          // backend returns: { success: true, jobs: [...] }
          dispatch(setallappliedjob(res.data.jobs || []));
        }
      } catch (error) {
        console.log('AppliedJob fetch error:', error?.response?.data || error?.message || error);
      }
    };

    fetchAllAppliedJob();
  }, [dispatch]);

  const appliedJobs = Array.isArray(allappliedjob) ? allappliedjob : [];
  console.log("appliedJobs:", appliedJobs);


  return (
    <div className="applied-job-wrap">
      <div className="applied-job-title">RECENT APPLIED JOB</div>

      <table className="applied-job-table">
        <thead>
          <tr>
            <th>date</th>
            <th>company</th>
            <th>role</th>
            <th>status</th>
          </tr>
        </thead>

        <tbody>
          {appliedJobs.length === 0 ? (
            <tr>
              <td colSpan={4}>No applied jobs found</td>
            </tr>
          ) : (
            appliedJobs.map((job) => (
              <tr key={job?._id || job?.job?._id || job?.createdAt}>
                <td>{job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : '-'}</td>
                <td>{job?.company?.name || '-'}</td>
                <td>{job?.title || '-'}</td>
                <td>{job?.status === '' || job?.status == null ? 'Applied' : job.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJob;

