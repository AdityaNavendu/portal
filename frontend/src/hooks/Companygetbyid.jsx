import { COMPANY_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setSingleCompany } from '@/redux/Companyslice';
function useCompanyGetById(companyId) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchsinglecompany = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${COMPANY_API_URL}/get/${companyId}`, {
          withCredentials: true,
        });

        if (res.data?.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchsinglecompany();
  }, [companyId, dispatch]);

  return { loading, error };
}

export default useCompanyGetById;


