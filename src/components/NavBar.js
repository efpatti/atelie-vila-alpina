import React, { useState, useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Cart3 } from "react-bootstrap-icons";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";
import logo from "../images/logo.png";

function NavbarComponent({ categories, onSelectCategory, onSearch }) {
  const cart = useContext(CartContext);
  const [show, setShow] = useState(false);
  const [addToCartClicked, setAddToCartClicked] = useState(false);

  const handleClose = () => {
    setShow(false);
    setAddToCartClicked(false);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleShow = () => setShow(true);

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar expand="sm" className="bgW">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="Logo Ateliê" />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end titleM jusP">
            <Nav className="position-absolute top-50 start-50 translate-middle navP">
              <Nav.Link href="/" className="title3">
                Início
              </Nav.Link>
              <Nav.Link href="/produtos" className="title3">
                Produtos
              </Nav.Link>
            </Nav>
            <a href="#1" className="btnC" onClick={handleShow}>
              <Cart3 className="btC" /> ({productsCount})
            </a>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        show={show}
        onHide={handleClose}
        className={`titleM${addToCartClicked ? " white-bg" : ""}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className="title10">Carrinho de Compras</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              {cart.items.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}

              <h1 className="title4">
                Total: {formatPrice(cart.getTotalCost())}
              </h1>

              <button className="custom-btn btn-card" onClick={checkout}>
                Comprar itens!
              </button>
            </>
          ) : (
            <h1 className="title6">Não há itens no seu carrinho.</h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
