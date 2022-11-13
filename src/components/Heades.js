import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo" target="_blank"></NavLink>
      <NavLink to="#" className="authorization">
        Войти
      </NavLink>
    </header>
  );
};
