import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

function ProductFilter({ categories, onSelectCategory, onSearch }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setSelectedCategory("Todos os produtos");
    onSelectCategory("Todos os produtos");
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const isLGDevice = /LG/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth <= 600;

  return (
    <Container className="text-center">
      <div className="category-menu">
        {isSmallScreen && isLGDevice ? (
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        ) : (
          categories.map((category) => (
            <span
              key={category}
              onClick={() =>
                handleCategoryChange({ target: { value: category } })
              }
              className={
                selectedCategory === category ? "selected-category" : "category"
              }
            >
              {category}
            </span>
          ))
        )}
      </div>
      <div className="text-center title-selected-category">
        {selectedCategory}
      </div>
    </Container>
  );
}

export default ProductFilter;
