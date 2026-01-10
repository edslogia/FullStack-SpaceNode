import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

/**
 * Footer Widget - Componente de pie de página global
 * Aparece solo al final del contenido, no es fixed
 */

const Footer: React.FC = () => {
  return (
    <footer className="bg-space-cosmos border-top">
      <Container fluid className="px-4 py-4">
        {/* Contenido principal */}
        <Row className="align-items-center g-3">
          <Col xs={12} md={6} className="text-center text-md-start">
            <p className="text-slate-400 small mb-0">
              © 2026 SpaceNode. Telemetría industrial para el futuro.
            </p>
          </Col>
          {/* Enlaces legales */}
          <Col xs={12} md={6}>
            <div className="d-flex gap-3 justify-content-center justify-content-md-end small">
              <a 
                href="/terminos" 
                className="text-slate-400 text-decoration-none footer-link"
              >
                Términos
              </a>
              <a 
                href="/privacidad" 
                className="text-slate-400 text-decoration-none footer-link"
              >
                Privacidad
              </a>
              <a 
                href="/contacto" 
                className="text-slate-400 text-decoration-none footer-link"
              >
                Contacto
              </a>
            </div>
          </Col>
        </Row>
        {/* Tagline */}
        <Row className="mt-3">
          <Col className="text-center">
            <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
              Hecho con 🚀 para la industria IoT
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
