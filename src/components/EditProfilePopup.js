import React, { useContext, useEffect, useState } from "react";

import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeName = e => {
    setName(e.target.value);
  };
  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = e => {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={"profile"}
      title={"Редактировать профиль"}
      btnText={"Сохранить"}
    >
      <label className="popup__label">
        <input
          type="text"
          name="name"
          id="popup__name-input"
          className="popup__input"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__name-input-error popup__input-error" />
      </label>
      <label className="popup__label">
        <input
          type="text"
          name="about"
          id="popup__about-input"
          className="popup__input"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__about-input-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
