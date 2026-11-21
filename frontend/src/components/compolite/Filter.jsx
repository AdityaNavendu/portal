/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import { useEffect, useState } from "react";
import "../../styles/filter.css";
import { useAppContext } from "@/context/AppContext";
import { jobFilters } from "@/utils/jobFilters";

/**
 * React component: `Filter`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Filter />`
 */
const Filter = () => {
  const { searchquery, setSearchQuery } = useAppContext();
  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(searchquery) ? searchquery : [],
  );

  /**
   * React component: `handleChange`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleChange />`
   */
  /**
   * React component: `handleChange`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleChange />`
   */
  /**
   * React component: `handleChange`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleChange />`
   */
  /**
   * React component: `handleChange`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleChange />`
   */
  const handleChange = (value) => {
    setSelectedValues((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  useEffect(() => {
    setSearchQuery(selectedValues);
  }, [selectedValues, setSearchQuery]);

  return (
    <div className="filter-container">
      <h1 className="filter-title">Filter Jobs</h1>
      <hr className="filter-divider" />

      <div className="filter-content">
        {jobFilters.map((data, index) => (
          <div key={index} className="filter-section">
            <h2 className="filter-heading">{data.filterType}</h2>

            {data.array.map((item, indx) => {
              /**
               * React component: `itemId`.
               * Renders one UI section of the job portal and responds to application state or user actions.
               * Example: `<itemId />`
               */
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