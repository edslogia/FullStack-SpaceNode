import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./LandingNavbar.css";

/**
 * LandingNavbar Widget - Navbar translúcido con efecto glassmorphism
 * Fixed top, responsive, con transición en scroll
 */

export const LandingNavbar = () => {
  // Sin animaciones ni efecto glassmorphism

  return (
    <Navbar
      fixed="top"
      expand="md"
      className="py-3 bg-space-cosmos border-bottom border-secondary"
      style={{ minHeight: "64px" }}
    >
      <Container fluid className="px-4">
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <div
            className="rounded"
            style={{ width: "32px", height: "32px" }}
          />
          <span className="fs-5 fw-bold text-slate-200">SpaceNode</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />

        <Navbar.Collapse id="navbar-nav">
          {/* Navegación central */}
          <Nav className="mx-auto">
            <Nav.Link
              href="#features"
              className="text-slate-400 fw-medium px-3"
            >
              Características
            </Nav.Link>
            <Nav.Link href="#pricing" className="text-slate-400 fw-medium px-3">
              Pricing
            </Nav.Link>
          </Nav>

          {/* CTA Login */}
          <Link
            to="/login"
            className="btn fw-semibold text-white px-4 py-2"
          >
            Login
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
