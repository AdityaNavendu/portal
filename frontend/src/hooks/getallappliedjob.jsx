/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import axios from "axios";

import { APPLICATION_API_URL } from "@/utils/data";
/**
 * React component: `fetchAllAppliedJob`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<fetchAllAppliedJob />`
 */
export const fetchAllAppliedJob = async () => {
  const res = await axios.get(`${APPLICATION_API_URL}/get/applied`, {
    withCredentials: true,
  });

  return res.data?.success ? res.data.jobs : [];
};

