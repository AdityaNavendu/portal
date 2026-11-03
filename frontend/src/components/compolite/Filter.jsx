import { useEffect, useState } from "react";
import "../../styles/filter.css";
import { useAppContext } from "@/context/AppContext";
import { jobFilters } from "@/utils/jobFilters";

const Filter = () => {
  const { searchquery, setSearchQuery } = useAppContext();
  const [selectedValues, setSelectedValues] = useState(
    Array.isArray(searchquery) ? searchquery : [],
  );

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