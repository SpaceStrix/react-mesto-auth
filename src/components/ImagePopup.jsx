export const ImagePopup = ({ card, name, onClose, onCardClick }) => {
  return (
    <div
      className={`popup popup_type_${name} ${card.link ? "popup_opened" : ""}`}
    >
      <div className="img-container">
        <figure className="img-container__block">
          <img
            src={card.link}
            alt="Тут должно быть изображение"
            className="img-container__img"
            onClick={onCardClick}
            onError={e => {
              e.target.src = require("../images/defaultIMG.png");
            }}
          />
          <figcaption className="img-container__title">{card.name}</figcaption>
        </figure>
        <button
          className="popup__close"
          aria-label="Кнопка закрытия попапа"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
