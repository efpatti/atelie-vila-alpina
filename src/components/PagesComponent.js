import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { productsArray } from "../productsStore";
import ProductCard from "../components/ProductCard";
import ProductFilter from "../components/ProductFilter";

function PagesComponent() {
  const categories = [
    "Todos os produtos",
    ...Array.from(new Set(productsArray.map((product) => product.category))),
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos os produtos");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Handle the default category logic here when the component mounts
    handleCategorySelect("Todos os produtos", searchQuery);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleCategorySelect = (selectedCategory, searchQuery) => {
    setSelectedCategory(selectedCategory);
    setSearchQuery(searchQuery || "");
  };

  const filteredProducts = productsArray.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos os produtos" ||
      product.category === selectedCategory;

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const isLGDevice = /LG/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth <= 600;

  return (
    <div>
      {isSmallScreen && isLGDevice ? (
        <ProductFilter
          categories={categories}
          onSelectCategory={handleCategorySelect}
          onSearch={setSearchQuery}
        />
      ) : (
        <ProductFilter
          categories={categories}
          onSelectCategory={handleCategorySelect}
          onSearch={setSearchQuery}
        />
      )}
      <div className="product-grid">
        <Row xs={1} md={3} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} className="links" />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default PagesComponent;
