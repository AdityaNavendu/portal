
import Applicanttable from './Applicanttable';
import Navbar from '../compolite/Navbar';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { APPLICATION_API_URL } from '@/utils/data';

import { useDispatch, useSelector } from 'react-redux';
import { setsingleApplications } from '@/redux/Applicationslice';
const Applicant = () => {
const param = useParams();

  console.log('Applicant route params:', param);


const dispatch= useDispatch()

  const { allapplications } = useSelector((state) => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        if (!param?.id) return;

        const res = await axios.get(`${APPLICATION_API_URL}/${param.id}/applicants`, {
          withCredentials: true,
        });

        // backend returns: { job: <job>, success: true }
        dispatch(setsingleApplications(res.data.job));
        console.log(res.data.job);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, [param?.id, dispatch]);
 


  return (
    <div>
      <Navbar />
  <div>
      <h1>Applicants {allapplications?.applicants?.length || 0}</h1>

      <Applicanttable />
  </div>
    </div>
  )
}

export default Applicant;
