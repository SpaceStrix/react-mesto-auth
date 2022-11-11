class Api {
  #onResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject({ message: "Возникла ошибка", response });
  }

  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //b массив карточек
  getAllCard() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(response => {
      return this.#onResponse(response);
    });
  }
  //b добавление новой карточки
  addNewCardToServer({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(response => {
      return this.#onResponse(response);
    });
  }
  //b удаление карточки
  removeCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(response => {
      return this.#onResponse(response);
    });
  }
  //b информация о пользователе
  getUserInfoFromServer() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(response => {
      return this.#onResponse(response);
    });
  }
  //b редактирование профиля
  setNewUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(response => {
      return this.#onResponse(response);
    });
  }
  //b изменение аватарки
  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(response => {
      return this.#onResponse(response);
    });
  }
  //b удаляем либо ставим лайк
  toggleLike(idCard, liked) {
    return fetch(`${this._url}/cards/${idCard}/likes `, {
      method: liked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(response => {
      return this.#onResponse(response);
    });
  }

  getInitialData() {
    return Promise.all([this.getAllCard(), this.getUserInfoFromServer()]);
  }
}

export const configApi = {
  url: "https://mesto.nomoreparties.co/v1/cohort-51",
  headers: {
    "content-type": "application/json",
    Authorization: "662f9b88-9df7-4d94-b426-3c935e9f3363",
  },
};

const api = new Api(configApi);
export default api;
