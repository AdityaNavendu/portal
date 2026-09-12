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

const Categories = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    const diff = e.clientX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    if (diff > 50) {
      prevSlide();
    } else if (diff < -50) {
      nextSlide();
    }
  };

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
