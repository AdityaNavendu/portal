import axios from "axios";

import { APPLICATION_API_URL } from "@/utils/data";
/**
 * React hook: `fetchAllAppliedJob`.
 * Axios se logged-in user's applied jobs fetch karke jobs array ya empty array return karta hai.
 * Example: `fetchAllAppliedJob(actual arguments);`
 */
export const fetchAllAppliedJob = async () => {
  const res = await axios.get(`${APPLICATION_API_URL}/get/applied`, {
    withCredentials: true,
  });

  return res.data?.success ? res.data.jobs : [];
};

