import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useContext(AuthContext);
  let location = useLocation();

  if (!axios.defaults.headers.common["Authorization"]) {
    if (auth.isUserTokenValid()) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `bearer ${auth.getUserToken()}`;
    } else {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }
  if (!auth.isUserTokenValid()) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
