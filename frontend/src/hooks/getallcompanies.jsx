import { COMPANY_API_URL } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

/**
 * React hook: `useGetAllCompanies`.
 * Axios se `/getall` call karke saari companies ko AppContext mein set karta hai.
 * Example: `useGetAllCompanies(actual arguments);`
 */
const useGetAllCompanies = () => {
  const { setCompanies } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
        /**
         * Function: `fetchCompanies`.
         * Companies API se list load karke context companies state update karta hai.
         * Example: `fetchCompanies(actual arguments);`
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