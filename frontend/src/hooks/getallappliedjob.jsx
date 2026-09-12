import axios from "axios";

import { APPLICATION_API_URL } from "@/utils/data";
import { setallappliedjob } from "@/redux/jobslice";
export const fetchAllAppliedJob = async (dispatch) => {
  const res = await axios.get(`${APPLICATION_API_URL}/get/applied`, {
    withCredentials: true,
  });

  if (res.data?.success) {
    dispatch(setallappliedjob(res.data.jobs));
  }
};


