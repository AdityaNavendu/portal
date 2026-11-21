import { COMPANY_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
/**
 * React hook: `useCompanyGetById`.
 * Company ID ke saath `/get/:id` call karke selected company ko AppContext mein set karta hai.
 * Example: `useCompanyGetById(actual arguments);`
 */
function useCompanyGetById(companyId) {
  const { setSingleCompany } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
        /**
         * Function: `fetchsinglecompany`.
         * Company ID se company details API se load karke shared state mein set karta hai.
         * Example: `fetchsinglecompany(actual arguments);`
         */
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

