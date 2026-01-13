import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import PasswordHelperBox from "@/features/auth/ui/PasswordHelperBox";
import type { PasswordStrength } from "@/features/auth/model/types";
import {
  FaUserAstronaut,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoKeypad } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { useState } from "react";
import { useUser } from "@/shared/model/user-context";
import { login } from "@/features/auth/api/login";
import { changePassword } from "@/features/auth/api/change-password";
import "./LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();

  // Estados para cambio de contraseña
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    label: "Muy débil",
    variant: "danger",
    requirements: {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecial: false,
    },
  });

  const calculatePasswordStrength = (pwd: string): PasswordStrength => {
    const requirements = {
      minLength: pwd.length >= 8,
      hasUpperCase: /[A-Z]/.test(pwd),
      hasLowerCase: /[a-z]/.test(pwd),
      hasNumber: /\d/.test(pwd),
      hasSpecial: /[@$!%*?&#_-]/.test(pwd),
    };

    const score = Object.values(requirements).filter(Boolean).length;

    let label = "Muy débil";
    let variant: "danger" | "warning" | "info" | "success" = "danger";

    if (score === 5) {
      label = "Muy fuerte";
      variant = "success";
    } else if (score === 4) {
      label = "Fuerte";
      variant = "info";
    } else if (score === 3) {
      label = "Moderada";
      variant = "warning";
    } else if (score >= 1) {
      label = "Débil";
      variant = "danger";
    }

    return { score: (score / 5) * 100, label, variant, requirements };
  };

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login({ username, password });

      // Guardar token siempre (necesario para cambio de contraseña)
      window.localStorage.setItem("accessToken", res.accessToken);
      window.localStorage.setItem("user", JSON.stringify(res.user));

      // Verificar si debe cambiar la contraseña
      if (!res.user.hasChangedPassword) {
        setMustChangePassword(true);
        setCurrentPassword(password); // Guardar la contraseña actual
        setLoading(false);
        return;
      }
      setUser(res.user);
      window.location.href = "/dashboard-admin";
    } catch (err: any) {
      setError(err.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones frontend
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword === currentPassword) {
      setError("La contraseña nueva debe ser diferente a la actual");
      return;
    }

    if (passwordStrength.score < 100) {
      setError("La contraseña no cumple con todos los requisitos de seguridad");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword({
        username,
        currentPassword,
        newPassword,
        confirmPassword,
      });

      window.localStorage.setItem("accessToken", res.accessToken);
      window.localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
      window.location.href = "/dashboard-admin";
    } catch (err: any) {
      setError(err.message || "Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  // Formulario de cambio de contraseña
  if (mustChangePassword) {
    return (
      <div className="login-page-container d-flex justify-content-center align-items-center vh-100">
        <div className="password-change-container d-flex gap-3">
          <Form
            className="login-form p-4 shadow"
            onSubmit={handleChangePassword}
          >
            <h2 className="mb-3 text-center">Cambiar Contraseña</h2>
            <Alert variant="warning" className="py-2 mb-3">
              <small>
                Por seguridad, debes cambiar tu contraseña antes de continuar.
              </small>
            </Alert>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaUserAstronaut className="icon-input" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Usuario"
                type="text"
                value={username}
                disabled
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FaLock className="icon-input" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Nueva contraseña"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => handleNewPasswordChange(e.target.value)}
                disabled={loading}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <IoKeypad className="icon-input" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Confirmar contraseña"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </InputGroup>

            {confirmPassword && (
              <div className="mb-2">
                {newPassword === confirmPassword ? (
                  <small className="text-success">
                    <FaCheckCircle /> Las contraseñas coinciden
                  </small>
                ) : (
                  <small className="text-danger">
                    <FaTimesCircle /> Las contraseñas no coinciden
                  </small>
                )}
              </div>
            )}

            {error && (
              <Alert variant="danger" className="py-2 mb-2">
                {error}
              </Alert>
            )}

            <Button type="submit" className="w-100 mt-2" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar Contraseña"}{" "}
              <BsStars />
            </Button>
          </Form>

          <PasswordHelperBox passwordStrength={passwordStrength} />
        </div>
      </div>
    );
  }

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
