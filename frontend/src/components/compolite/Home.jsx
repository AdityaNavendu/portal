/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */


import Navbar from "./Navbar";
import Header from "./Header";
import Categories from "./Categories";
import Latestjob from "./Latestjob";
import Footer from "./Footer";
import "../../styles/home.css";
import Getalljob from "@/hooks/Getalljob";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

/**
 * React component: `Home`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Home />`
 */
const Home = () => {

  const { loading, error } = Getalljob();
  const { alljobs: jobs, user } = useAppContext();
  console.log(jobs);

  /**
   * React component: `navigate`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<navigate />`
   */
  const navigate = useNavigate();

useEffect(() => {
  if(user?.role==="recruiter"){
    navigate("/admin/companies");
  }
}, [])


    return (
    <div className="home__root">
      <Navbar></Navbar>
      <Header></Header>
      <Categories />
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error loading jobs: {error.message}</p>}
      {!loading && !error && 
      <Latestjob jobs={jobs} />}
            <Footer />
    </div>
  );
};

export default Home;
