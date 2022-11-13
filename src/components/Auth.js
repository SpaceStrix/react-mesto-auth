export const BASE_URL = "https://auth.nomoreparties.co/"; //Базовый URL

const checkResponse = res =>
  res.ok ? res.json() : Promise.reject(`что-то не так ${res.statusText}`); // ответ сервера

// Эндпоинт: /signup
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(password, email),
  }).then(checkResponse);
};

// Эндпоинт: /signin
export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(password, email),
  }).then(checkResponse);
};

// Эндпоинт: /users/me
export const checkToken = token => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
