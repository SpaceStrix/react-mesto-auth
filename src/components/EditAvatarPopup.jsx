import React, { useRef } from "react";
import { useEffect } from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"avatar"}
      title={"Обновить аватар"}
      btnText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          name="avatar"
          id="popup__url-avatar"
          className="popup__input"
          placeholder="Укажите ссылку"
          minLength="2"
          maxLength="200"
          required
          ref={avatarRef || ""}
        />
        <span className="popup__url-avatar-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
};
