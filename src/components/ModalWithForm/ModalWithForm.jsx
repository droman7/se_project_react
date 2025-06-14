import "./ModalWithForm.css";

function ModalWithForm({ children, title, isOpen, onClose, onSubmit, name }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close" type="button" />
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
