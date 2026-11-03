import '../../styles/appliedjob.css';
import { useEffect } from 'react';
import axios from 'axios';

import { APPLICATION_API_URL } from '@/utils/data';
import { useAppContext } from '@/context/AppContext';

const AppliedJob = () => {
  const { allappliedjob, setAllAppliedJob } = useAppContext();

  useEffect(() => {
    const fetchAllAppliedJob = async () => {
      try {

        const res = await axios.get(`${APPLICATION_API_URL}/get`, {
          withCredentials: true,
        });

        if (res.data?.success) {

          setAllAppliedJob(res.data.jobs || []);
        }
      } catch (error) {
        console.log('AppliedJob fetch error:', error?.response?.data || error?.message || error);
      }
    };

    fetchAllAppliedJob();
  }, [setAllAppliedJob]);

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
                <td>{job?.appliedAt || job?.createdAt ? new Date(job.appliedAt || job.createdAt).toLocaleDateString() : '-'}</td>
                <td>{job?.company?.name || '-'}</td>
                <td>{job?.title || '-'}</td>
                <td>{job?.status === 'accepted' ? 'Accepted' : job?.status === 'rejected' ? 'Rejected' : 'Applied'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJob;
