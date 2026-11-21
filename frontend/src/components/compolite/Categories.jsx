/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/categories.css";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

/**
 * React component: `Categories`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Categories />`
 */
const Categories = () => {
  /**
   * React component: `navigate`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<navigate />`
   */
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);

  /**
   * React component: `nextSlide`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<nextSlide />`
   */
  /**
   * React component: `nextSlide`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<nextSlide />`
   */
  /**
   * React component: `nextSlide`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<nextSlide />`
   */
  /**
   * React component: `nextSlide`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<nextSlide />`
   */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % categories.length);
  };

  /**
   * React component: `prevSlide`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<prevSlide />`
   */
  /**
   * React component: `prevSlide`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<prevSlide />`
   */
  /**
   * React component: `prevSlide`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<prevSlide />`
   */
  /**
   * React component: `prevSlide`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<prevSlide />`
   */
  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  /**
   * React component: `handleMouseDown`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleMouseDown />`
   */
  /**
   * React component: `handleMouseDown`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleMouseDown />`
   */
  /**
   * React component: `handleMouseDown`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleMouseDown />`
   */
  /**
   * React component: `handleMouseDown`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleMouseDown />`
   */
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  /**
   * React component: `handleMouseUp`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleMouseUp />`
   */
  /**
   * React component: `handleMouseUp`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleMouseUp />`
   */
  /**
   * React component: `handleMouseUp`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleMouseUp />`
   */
  /**
   * React component: `handleMouseUp`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleMouseUp />`
   */
  const handleMouseUp = (e) => {
    /**
     * React component: `diff`.
     * Renders one UI section of the job portal and responds to application state or user actions.
     * Example: `<diff />`
     */
    const diff = e.clientX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

  /**
   * React component: `handleTouchStart`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleTouchStart />`
   */
  /**
   * React component: `handleTouchStart`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleTouchStart />`
   */
  /**
   * React component: `handleTouchStart`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleTouchStart />`
   */
  /**
   * React component: `handleTouchStart`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleTouchStart />`
   */
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  /**
   * React component: `handleTouchEnd`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleTouchEnd />`
   */
  /**
   * React component: `handleTouchEnd`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<handleTouchEnd />`
   */
  /**
   * React component: `handleTouchEnd`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleTouchEnd />`
   */
  /**
   * React component: `handleTouchEnd`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<handleTouchEnd />`
   */
  const handleTouchEnd = (e) => {
    /**
     * React component: `diff`.
     * Renders one UI section of the job portal and responds to application state or user actions.
     * Example: `<diff />`
     */
    const diff = e.changedTouches[0].clientX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

  /**
   * React component: `onCategoryClick`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<onCategoryClick />`
   */
  /**
   * React component: `onCategoryClick`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<onCategoryClick />`
   */
  /**
   * React component: `onCategoryClick`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<onCategoryClick />`
   */
  /**
   * React component: `onCategoryClick`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<onCategoryClick />`
   */
  const onCategoryClick = (category) => {
    navigate(`/browse?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="categories">
      <div className="categories-header">
        <h1 className="categories-title">Categories</h1>
        <p className="categories-subtitle">
          Explore our extensive job market.
        </p>
      </div>

      <div className="slider-wrapper">
        <button className="slider-btn" onClick={prevSlide}>
          ❮
        </button>

        <div
          className="slider-container"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${current * 33.333}%)`,
            }}
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="slider-card"
                style={{ cursor: "pointer" }}
                onClick={() => onCategoryClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <button className="slider-btn" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default Categories;
