import { createBrowserRouter } from "react-router-dom";

import Login from "./components/authen/Login.jsx";
import Register from "./components/authen/Register.jsx";
import Home from "./components/compolite/Home.jsx";
import { RouterProvider } from "react-router-dom";
import Privacypolicy from "./components/compolite/Privacyploicy.jsx";
import Termsofservices from "./components/compolite/Termsofservices.jsx";
import Jobs from "./components/compolite/Jobs.jsx";
import Profile from "./components/compolite/Profile.jsx";
import Browse from "./components/compolite/Browse.jsx";
import Companies from "./components/admincomponent/Companies.jsx";
import Description from "./components/compolite/Description.jsx";
import SavedJobs from "./components/compolite/SavedJobs.jsx";
import Companycreate from "./components/admincomponent/Companycreate.jsx";
import CompanySetup from "./components/admincomponent/CompanySetup.jsx";
import Jobss from "./components/admincomponent/Jobss.jsx";
import PostJob from "./components/admincomponent/postjob.jsx";
import Applicant from "./components/admincomponent/Applicant.jsx";
import ProtectedRoute from "./components/admincomponent/protectedroute.jsx";



const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/description/:jobId",
    element: <Description />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/saved-jobs",
    element: <SavedJobs />,
  },
  {
    path: "/privacy-policy",
    element: <Privacypolicy />,
  },
  {
    path: "/terms-of-services",
    element: <Termsofservices />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },



  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>,
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><Companycreate /></ProtectedRoute>,
  },
{
  path:"/admin/companies/:id",  
  element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
},
{
  path:"/admin/jobs",
  element: <ProtectedRoute><Jobss /></ProtectedRoute>

},
  {
  path:"/admin/jobs/create",
  element: <ProtectedRoute><PostJob/></ProtectedRoute>
},
{
  path:"/admin/jobs/:id",
  element: <ProtectedRoute><PostJob/></ProtectedRoute>

},
{
  path:"/admin/jobs/:id/applicant",
  element: <ProtectedRoute><Applicant/></ProtectedRoute>
}
]);


function App() {
  return (
    <div className="w-full ">
      <RouterProvider router={approuter} />
    </div>
  );
}

export default App;
