
import Navbar from "../compolite/Navbar";
import { ArrowLeft } from "lucide-react";
import "../../styles/setup.css";
import axios from "axios";
import { COMPANY_API_URL } from "@/utils/data";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useCompanyGetById from "@/hooks/Companygetbyid";
import { useAppContext } from "@/context/AppContext";


const CompanySetup = () => {
  const param = useParams();


  useCompanyGetById(param?.id);

  const { singleCompany } = useAppContext();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
console.log(input)
const navigate = useNavigate();
const [loading, setLoading] = useState(false);


  const changeeventhandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const fileEventhandler = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };
const submithandler= async (e)=>{
  e.preventDefault();
   console.log(input)
   const formData = new FormData();
   formData.append("name", input.name);
   formData.append("description", input.description);
   formData.append("website", input.website);
   formData.append("location", input.location);
   if(input.file){
     formData.append("file", input.file);
   }
   console.log(formData)
   try {
    setLoading(true)
    const res= await axios.put(`${COMPANY_API_URL}/update/${param.id}`, formData,
      {
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      }
      
    );
    console.log(res)
    if(res.data.success){
      toast.success(res.data.message || "Company updated successfully");
      navigate("/admin/companies");
    } 

    
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
   }
   finally{
    setLoading(false)
   }
   

}

useEffect(() => {
  if (!singleCompany || Object.keys(singleCompany).length === 0) return;

  setInput({
    name: singleCompany.name || "",
    description: singleCompany.description || "",
    website: singleCompany.website || "",
    location: singleCompany.location || "",
    file: singleCompany.logo || null,
  });
}, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="setup__root">
        <form onSubmit={submithandler}>
          <div className="setup__header">
            <button className="setup__back">
              <ArrowLeft />
              <span>Back</span>
            </button>
            <h1 className="setup__title">Company Setup</h1>
          </div>
          <div className="setup__form">
      <div className="formmodal__header">
            <label>Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            name="name"
            value={input.name}
            onChange={changeeventhandler}
          />
      </div>
      <div className="formmodal__header">
            <label>Company Description</label>
          <input
            type="text"
            placeholder="Company Description"
            name="description"
            value={input.description}
            onChange={changeeventhandler}
          />
      </div>
      <div className="formmodal__header">
            <label>Company Website</label>
          <input
            type="text"
            placeholder="Company Website"
            name="website"
            value={input.website}
            onChange={changeeventhandler}
          />
      
      </div>
      <div className="formmodal__header">
            <label>Company Location</label>
            <input
            type="text"
            placeholder="Company Location"
            name="location"
            value={input.location}
            onChange={changeeventhandler}
          />
      </div>
      <div className="formmodal__header">
        <label>Company Logo</label>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={fileEventhandler}
        />
      </div>
      </div>
      <button className="setup__submit" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
