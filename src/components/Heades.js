import { NavLink, Route, Routes } from "react-router-dom";

export const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <NavLink to="/" className="header__logo" target="_blank" />
      <Routes>
        <Route
          path="/"
          element={
            <NavLink to="#" className="authorization" onClick={onLogout}>
              Выйти
            </NavLink>
          }
        />
      </Routes>
    </header>
  );
};
