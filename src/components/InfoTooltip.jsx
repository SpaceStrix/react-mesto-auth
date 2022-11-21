export const InfoTooltip = ({ status, isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__auth">
        <button
          className="popup__close"
          aria-label="Кнопка закрытия попапа"
          type="button"
          onClick={onClose}
        />
        <img
          src={
            status
              ? require("../images/successfully.png")
              : require("../images/not-successful.png")
          }
          alt="img-status"
        />
        <p className="status-auth__title">
          {status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
};
