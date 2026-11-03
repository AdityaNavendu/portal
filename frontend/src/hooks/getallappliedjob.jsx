import axios from "axios";

import { APPLICATION_API_URL } from "@/utils/data";
export const fetchAllAppliedJob = async () => {
  const res = await axios.get(`${APPLICATION_API_URL}/get/applied`, {
    withCredentials: true,
  });

  return res.data?.success ? res.data.jobs : [];
};

