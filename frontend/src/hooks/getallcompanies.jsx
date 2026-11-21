/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import { COMPANY_API_URL } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

/**
 * React hook ya state helper: `useGetAllCompanies`.
 * Shared portal state ko read/update karta hai aur React components ise reuse karte hain.
 * Example: `useGetAllCompanies();`
 */
const useGetAllCompanies = () => {
  const { setCompanies } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * React component: `fetchCompanies`.
     * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
     * Example: `<fetchCompanies />`
     */
    const fetchCompanies = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`${COMPANY_API_URL}/getall`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setCompanies(res.data.companies);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [setCompanies]);

  return { loading, error };
};

export default useGetAllCompanies;