import { COMPANY_API_URL } from "@/utils/data";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setcompanies } from "@/redux/Companyslice";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();

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
          dispatch(setcompanies(res.data.companies));
        }
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [dispatch]);

  return { loading, error };
};

export default useGetAllCompanies;