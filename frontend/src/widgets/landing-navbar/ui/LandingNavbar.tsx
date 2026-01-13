import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FaUserAstronaut } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import "./LandingNavbar.css";

/**
 * LandingNavbar Widget - Navbar translúcido con efecto glassmorphism
 * Fixed top, responsive, con transición en scroll
 */

export const LandingNavbar = () => {
  // Sin animaciones ni efecto glassmorphism

  const isLoggedIn = Boolean(window.localStorage.getItem("accessToken"));

  const handleLogout = () => {
    window.localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <Navbar
      fixed="top"
      expand="md"
      className=" bg-space-cosmos border-bottom border-secondary"
      style={{ minHeight: "64px" }}
    >
      <Container fluid className="px-4">
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <div className="rounded" style={{ width: "32px", height: "32px" }} />
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

          {/* CTA Login/Logout */}
          {isLoggedIn ? (
            <Link
              to="/login"
              className="navbar-login-btn d-flex align-items-center fw-semibold text-white px-4"
              onClick={e => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <span className="navbar-login-icon d-flex align-items-center justify-content-center me-2">
                <IoMdExit />
              </span>
              Salir
            </Link>
          ) : (
            <Link
              to="/login"
              className="navbar-login-btn d-flex align-items-center fw-semibold text-white px-4"
            >
              <span className="navbar-login-icon d-flex align-items-center justify-content-center me-2">
                <FaUserAstronaut />
              </span>
              Ingresar
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
