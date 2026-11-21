/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import { COMPANY_API_URL } from '@/utils/data';
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
/**
 * React hook ya state helper: `useCompanyGetById`.
 * Shared portal state ko read/update karta hai aur React components ise reuse karte hain.
 * Example: `useCompanyGetById();`
 */
function useCompanyGetById(companyId) {
  const { setSingleCompany } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * React component: `fetchsinglecompany`.
     * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
     * Example: `<fetchsinglecompany />`
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

