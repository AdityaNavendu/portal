/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import "../../styles/companiesTable.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
 
/**
 * React component: `CompanyTable`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<CompanyTable />`
 */
const CompanyTable = () => {
  const { companies, searchCompanyByText } = useAppContext();


  const filteredCompanies = companies.filter((company) => {
    if (!searchCompanyByText) return true;

    const text = searchCompanyByText.toLowerCase();
    return company?.name?.toLowerCase().includes(text);
  });

  const  navigate = useNavigate();

  return (
    <div className="table-container">
      {filteredCompanies.length === 0 ? (
        <span>No companies found</span>
      ) : (
        <table className="company-table">
          <caption>Your recent registered Companies</caption>

          <thead>
            <tr>
              <th>Logo</th>
              <th>Company Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company._id}>
                <td>
                  <img
                    src={
                      company.logo ||
                      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                    }
                    alt={company.name}
                    className="logo"
                  />
                </td>

                <td>{company.name}</td>

                <td>{new Date(company.createdAt).toLocaleDateString()}</td>

                <td>
                  <button onClick={()=>navigate(`/admin/companies/${company._id}`)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompanyTable;