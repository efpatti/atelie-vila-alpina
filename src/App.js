import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/NavBar";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import CartProvider from "./CartContext";
import "./css/Store.css";
import Store from "./pages/Store";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Container>
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produtos" element={<Store />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
