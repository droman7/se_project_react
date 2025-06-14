import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  switchToLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatarUrl("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password, name, avatarUrl });
  };

  const isFormValid =
    email.trim() !== "" &&
    password.trim().length >= 6 &&
    name.trim().length >= 1 &&
    name.trim().length <= 30 &&
    avatarUrl.trim() !== "";

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          placeholder="Email"
          className="modal__input modal__input_type_register"
          id="register-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          placeholder="Password"
          className="modal__input modal__input_type_register"
          id="register-password"
          required
          minLength="6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input modal__input_type_register"
          id="register-name"
          required
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input modal__input_type_register"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </label>

      <div className="button__container">
        <button
          className={`modal__submit ${
            isFormValid ? "modal__submit_active" : ""
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          Sign Up
        </button>
        <button className="login__button" type="button" onClick={switchToLogin}>
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
