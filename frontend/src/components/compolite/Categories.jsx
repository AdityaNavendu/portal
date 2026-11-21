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
 * Technology/category options dikhata hai aur selection ko shared job search query mein add/remove karta hai.
 * Example: `<Categories />`
 */
const Categories = () => {
    const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);

          /**
           * Utility/function: `nextSlide`.
           * `nextSlide` is component/hook ke focused UI ya state operation ko execute karta hai.
           * Example: `nextSlide(actual arguments);`
           */
          const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % categories.length);
  };

          /**
           * Utility/function: `prevSlide`.
           * `prevSlide` is component/hook ke focused UI ya state operation ko execute karta hai.
           * Example: `prevSlide(actual arguments);`
           */
          const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

          /**
           * Event handler: `handleMouseDown`.
           * `handleMouseDown` user/form event ki value aur state read karke UI state ya API submission update karta hai.
           * Example: `handleMouseDown(actual arguments);`
           */
          const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

          /**
           * Event handler: `handleMouseUp`.
           * `handleMouseUp` user/form event ki value aur state read karke UI state ya API submission update karta hai.
           * Example: `handleMouseUp(actual arguments);`
           */
          const handleMouseUp = (e) => {
        const diff = e.clientX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

          /**
           * Event handler: `handleTouchStart`.
           * `handleTouchStart` user/form event ki value aur state read karke UI state ya API submission update karta hai.
           * Example: `handleTouchStart(actual arguments);`
           */
          const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

          /**
           * Event handler: `handleTouchEnd`.
           * `handleTouchEnd` user/form event ki value aur state read karke UI state ya API submission update karta hai.
           * Example: `handleTouchEnd(actual arguments);`
           */
          const handleTouchEnd = (e) => {
        const diff = e.changedTouches[0].clientX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

          /**
           * Utility/function: `onCategoryClick`.
           * `onCategoryClick` is component/hook ke focused UI ya state operation ko execute karta hai.
           * Example: `onCategoryClick(actual arguments);`
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
