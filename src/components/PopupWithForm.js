const PopupWithForm = ({
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  title,
  btnText,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          aria-label="Кнопка закрытия попапа"
          type="button"
          onClick={onClose}
        />
        <form
          onSubmit={onSubmit}
          className="popup__form"
          name={`popup__form-${name}`}
          noValidate=""
        >
          <fieldset className="popup__input-container">
            <legend className="popup__title">{title}</legend>
            {children}
          </fieldset>
          <button type="submit" className="popup__btn-safe">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
