import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { FaUserAstronaut } from "react-icons/fa";
import { IoKeypad } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import { login } from "@/features/auth/api/login";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ username, password });
      window.localStorage.setItem("accessToken", res.accessToken);
      console.log("Login exitoso:", res);
      // Redirigir o recargar
      window.location.href = "/dashboard-admin";
    } catch (err: any) {
      setError(err.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container d-flex justify-content-center align-items-center vh-100">
      <Form className="login-form p-4 shadow" onSubmit={handleSubmit}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </InputGroup>
        {error && <div className="alert alert-danger py-1 mb-2">{error}</div>}
        <Button type="submit" className="w-100 mt-2" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
          <>
            {" "}
            <BsStars />
          </>
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
