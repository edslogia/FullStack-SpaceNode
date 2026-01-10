import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaUserAstronaut } from "react-icons/fa";
import { IoKeypad } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="login-page-container d-flex justify-content-center align-items-center vh-100">
      <Form className="login-form p-4 rounded shadow">
        <h2 className="mb-4 text-center">Iniciar sesión</h2>
        <InputGroup className="mb-3">
          <InputGroup.Text id="login-username-addon">
            <FaUserAstronaut className="icon-input" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Usuario"
            aria-label="Usuario"
            aria-describedby="login-username-addon"
            type="text"
            autoComplete="username"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="login-password-addon">
            <IoKeypad className="icon-input" />
          </InputGroup.Text>
          <Form.Control
            placeholder="Contraseña"
            aria-label="Contraseña"
            aria-describedby="login-password-addon"
            type="password"
            autoComplete="current-password"
          />
        </InputGroup>
        <Button variant="primary" type="submit" className="w-100 mt-2">
           Ingresar
          <> <BsStars /></>
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
