import React, { useRef, useEffect } from "react";

import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const cardTitleRef = useRef();
  const cardUrlRef = useRef();

  useEffect(() => {
    if (isOpen) {
      cardUrlRef.current.value = "";
      cardTitleRef.current.value = "";
    }
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();

    onAddPlace({
      link: cardUrlRef.current.value,
      name: cardTitleRef.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"element"}
      title={"Новое место"}
      btnText={"Создать"}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          id="popup__title-input"
          className="popup__input"
          placeholder="Название"
          minLength={2}
          maxLength={40}
          required
          ref={cardTitleRef}
        />
        <span className="popup__title-input-error popup__input-error" />
      </label>
      <label className="popup__label">
        <input
          type="url"
          name="link"
          id="popup__url-input"
          className="popup__input"
          placeholder="Укажите ссылку"
          minLength={2}
          maxLength={200}
          required
          ref={cardUrlRef}
        />
        <span className="popup__url-input-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
};
