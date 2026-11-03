import { COMPANY_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
function useCompanyGetById(companyId) {
  const { setSingleCompany } = useAppContext();
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
          setSingleCompany(res.data.company);
        }
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchsinglecompany();
  }, [companyId, setSingleCompany]);

  return { loading, error };
}

export default useCompanyGetById;

