const Register = () => {
  return (
    <section className="signup">
      <form action="" className="signup-form">
        <fieldset className="signup__group">
          <legend className="signup__title">Регистрация</legend>
          <input
            name="regEmail"
            type="email"
            placeholder="Email"
            className="signup__input"
            required
          />
          <input
            name="regPass"
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

export default Register;
