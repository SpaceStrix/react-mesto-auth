import { useEffect } from "react";

export const PopupWithForm = ({
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  title,
  btnText,
}) => {
  const onOverlayClick = e => {
    onClose();
    e.stopPropagation();
  };

  const onPopupClick = e => {
    e.stopPropagation();
  };

  useEffect(() => {
    const closeByCkick = e => {
      if (e.key === "Escape") {
        onClose && onClose();
      }
    };
    document.addEventListener("keydown", closeByCkick);
    return () => document.removeEventListener("keydown", closeByCkick);
  }, []);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="popup__container" onClick={onPopupClick}>
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
