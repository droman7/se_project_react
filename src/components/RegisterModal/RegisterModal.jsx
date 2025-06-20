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
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatarUrl("");
    }
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
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
      isSubmitDisabled={!isFormValid}
      childrenAfterForm={
        <button
          type="button"
          className="modal__login-button"
          onClick={switchToLogin}
        >
          or Log In
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          placeholder="Email"
          className="modal__input"
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
          className="modal__input"
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
          className="modal__input"
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
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}
