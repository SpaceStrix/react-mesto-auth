import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
export const Login = ({ loggedIn, onLogin }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    password: "",
    email: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (!userData.password || !userData.email) {
      return;
    }
    onLogin(userData);
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <section className="signup">
      <form action="" className="signup-form" onSubmit={handleSubmit}>
        <fieldset className="signup__group">
          <legend className="signup__title">Вход</legend>
          <input
            name="email"
            value={userData.email}
            type="email"
            placeholder="Email"
            className="signup__input"
            required
            onChange={handleChange}
          />

          <input
            name="password"
            value={userData.password}
            type="password"
            placeholder="Пароль"
            className="signup__input"
            required
            onChange={handleChange}
          />
        </fieldset>
        <button className="signup__btn-auth" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
};
