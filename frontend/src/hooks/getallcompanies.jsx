import { COMPANY_API_URL } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

const useGetAllCompanies = () => {
  const { setCompanies } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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