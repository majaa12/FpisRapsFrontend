import React from "react";
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Raps zacini d.o.o</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
              </Nav.Link>
              <NavDropdown title="Kupac" id="collasible-nav-dropdown">
                <LinkContainer to="/kupac">
                  <NavDropdown.Item>Dodaj novog</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/kupci">
                  <NavDropdown.Item>
                    Pretrazi / Izmeni / Obrisi
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <Nav.Link>
                <i className="fas fa-money-check-alt"></i>
              </Nav.Link>
              <NavDropdown title="Racun" id="collasible-nav-dropdown">
                <LinkContainer to="/racun">
                  <NavDropdown.Item>Kreiraj novi</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/racuni">
                  <NavDropdown.Item>
                    Pretrazi / Izmeni / Obrisi
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
