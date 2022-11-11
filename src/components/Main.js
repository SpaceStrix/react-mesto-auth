import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

const Main = ({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__person">
          <button className="profile__avatar" onClick={onEditAvatar}>
            <img
              src={currentUser.avatar}
              alt="avatar"
              className="profile__avatar-img"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              aria-label="Кнопка редактирования профиля"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-item"
          type="button"
          aria-label="Кнопка добавление карточки"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map(card => {
          return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>

      <section className="signup" style={{ display: "none" }}>
        <form action="" className="signup-form">
          <fieldset className="signup__group">
            <legend className="signup__title">Регистрация</legend>
            <input
              type="email"
              placeholder="Email"
              className="signup__input"
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              className="signup__input"
              required
            />
          </fieldset>
          <button className="signup__btn-auth" type="submit">
            Зарегистрироваться
          </button>
          <p className="signup__log-in">
            Уже зарегистрированы?&nbsp;
            <a href="#" className="signup__log-in-link">
              Войти
            </a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Main;
