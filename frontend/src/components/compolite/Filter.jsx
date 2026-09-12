import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchquery } from "../../redux/jobslice";
import "../../styles/filter.css";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    dispatch(setSearchquery(selectedValues));
  }, [selectedValues, dispatch]);

  return (
    <div className="filter-container">
      <h1 className="filter-title">Filter Jobs</h1>
      <hr className="filter-divider" />

      <div className="filter-content">
        {filterData.map((data, index) => (
          <div key={index} className="filter-section">
            <h2 className="filter-heading">{data.filterType}</h2>

            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;

              return (
                <div key={itemId} className="filter-item">
                  <input
                    type="checkbox"
                    id={itemId}
                    value={item}
                    checked={selectedValues.includes(item)}
                    onChange={() => handleChange(item)}
                    className="filter-checkbox"
                  />

                  <label htmlFor={itemId} className="filter-label">
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;