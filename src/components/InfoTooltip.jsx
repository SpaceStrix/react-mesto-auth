import { PopupWithForm } from "./PopupWithForm";

import successfully from "../images/successfully.png";
import notSuccessfully from "../images/not-successful.png";

export const InfoTooltip = ({ status, isOpen, onClose }) => {
  console.log(status);
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__auth">
        <button
          className="popup__close"
          aria-label="Кнопка закрытия попапа"
          type="button"
          onClick={onClose}
        />
        <img src={status ? successfully : notSuccessfully} alt="img-status" />
        <p className="status-auth__title">
          {status
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
};
