import { useState } from "react";

export const Register = ({ onReg }) => {
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

    onReg(userData);
  };

  return (
    <section className="signup">
      <form action="" className="signup-form" onSubmit={handleSubmit}>
        <fieldset className="signup__group">
          <legend className="signup__title">Регистрация</legend>
          <input
            name="email"
            value={userData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="signup__input"
            required
          />
          <input
            name="password"
            value={userData.password}
            onChange={handleChange}
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
  );
};
