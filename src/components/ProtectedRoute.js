import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to="sign-in" />;
};
