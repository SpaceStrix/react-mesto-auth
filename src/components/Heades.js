import { NavLink, Route, Routes } from "react-router-dom";

export const Header = ({ onLogout, email }) => {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo" target="_blank" />

      <div className="header__user">
        <span className="header__user-email">{email}</span>
        <Routes>
          <Route
            path="/sing-up"
            element={
              <NavLink to="/sign-in" className="authorization">
                Войти
              </NavLink>
            }
          />
          <Route
            path="/sign-in"
            element={
              <NavLink to="/sign-up" className="authorization">
                Регистрация
              </NavLink>
            }
          />
          <Route
            path="/"
            element={
              <NavLink to="/" className="authorization" onClick={onLogout}>
                Выйти
              </NavLink>
            }
          />
        </Routes>
      </div>
    </header>
  );
};
