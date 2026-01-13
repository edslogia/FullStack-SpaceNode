import ProgressBar from "react-bootstrap/ProgressBar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import React from "react";
import type { PasswordStrength } from "@/features/auth/model/types";
import "./PasswordHelperBox.css";

interface PasswordHelperBoxProps {
  passwordStrength: PasswordStrength;
}

const PasswordHelperBox: React.FC<PasswordHelperBoxProps> = ({
  passwordStrength,
}) => (
  <div className="password-helper-box shadow">
    <h6 className="mb-3 text-center">Requisitos de Seguridad</h6>
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">Fortaleza:</small>
        <small className={`text-${passwordStrength.variant} fw-bold`}>
          {passwordStrength.label}
        </small>
      </div>
      <ProgressBar
        now={passwordStrength.score}
        variant={passwordStrength.variant}
        style={{ height: "10px" }}
      />
    </div>
    <hr className="my-3" />
    <div className="password-requirements">
      <small className="d-block mb-2 fw-bold text-light">
        Tu contraseña debe tener:
      </small>
      <small
        className={
          passwordStrength.requirements.minLength
            ? "text-success"
            : "text-muted"
        }
      >
        {passwordStrength.requirements.minLength ? (
          <FaCheckCircle />
        ) : (
          <FaTimesCircle />
        )}{" "}
        Mínimo 8 caracteres
      </small>
      <br />
      <small
        className={
          passwordStrength.requirements.hasUpperCase
            ? "text-success"
            : "text-muted"
        }
      >
        {passwordStrength.requirements.hasUpperCase ? (
          <FaCheckCircle />
        ) : (
          <FaTimesCircle />
        )}{" "}
        Al menos 1 mayúscula
      </small>
      <br />
      <small
        className={
          passwordStrength.requirements.hasLowerCase
            ? "text-success"
            : "text-muted"
        }
      >
        {passwordStrength.requirements.hasLowerCase ? (
          <FaCheckCircle />
        ) : (
          <FaTimesCircle />
        )}{" "}
        Al menos 1 minúscula
      </small>
      <br />
      <small
        className={
          passwordStrength.requirements.hasNumber
            ? "text-success"
            : "text-muted"
        }
      >
        {passwordStrength.requirements.hasNumber ? (
          <FaCheckCircle />
        ) : (
          <FaTimesCircle />
        )}{" "}
        Al menos 1 número
      </small>
      <br />
      <small
        className={
          passwordStrength.requirements.hasSpecial
            ? "text-success"
            : "text-muted"
        }
      >
        {passwordStrength.requirements.hasSpecial ? (
          <FaCheckCircle />
        ) : (
          <FaTimesCircle />
        )}{" "}
        Al menos 1 carácter especial (@$!%*?&#_-)
      </small>
    </div>
  </div>
);

export default PasswordHelperBox;
