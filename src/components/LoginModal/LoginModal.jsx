import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

export default function LoginModal({
  onClose,
  isOpen,
  onLogin,
  switchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const isFormValid = email.trim() !== "" && password.trim().length >= 6;

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input modal__input_type_login"
          id="login-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input modal__input_type_login"
          id="login-password"
          required
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </label>

      <div className="button__container">
        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : ""
          }`}
          type="submit"
        >
          Login
        </button>
        <button
          type="button"
          className="modal__signup__button"
          onClick={switchToRegister}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
}
