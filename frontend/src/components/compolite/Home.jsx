
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

const Home = () => {

  const { loading, error } = Getalljob();
  const { alljobs: jobs, user } = useAppContext();
  console.log(jobs);

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
