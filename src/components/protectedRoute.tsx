import { JSX, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";
import { getUser } from "../utils/api";

type Protected = {
    component: JSX.Element;
}

export const ProtectedOnlyAuth = ({component}: Protected) => {
  const [ user, { setIsAuth }] = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (user.isAuth === true) {
    return component;
  } else if (user.isAuth === false && token) {
      if (token != null) {
        getUser(token).then(() => setIsAuth(true));
        return component;
      } else {
      console.log('Ошибка токена')
      return <Navigate to="/login" state={{from: location} } />
      }
  } else {
    return <Navigate to="/login" state={{from: location} } />;
  }
}

export const ProtectedOnlyUnAuth = ({component}: Protected) => {
  const [ user, { setIsAuth }] = useContext(AuthContext);
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (user.isAuth === true) {
    return <Navigate to="/profile" state={{from: location} } />
  } else if (user.isAuth === false && token) {
      if (token != null) {
        getUser(token).then(() => setIsAuth(true));
        return <Navigate to="/profile" state={{from: location} } />
      } else {
      return component;
      }
  } else {
    return component;
  }
}

export const Protected = ({component}: Protected) => {
  const [ user, { setIsAuth }] = useContext(AuthContext);
  const token = localStorage.getItem('token');

  if (user.isAuth === false && token) {
    if (token != null) {
      getUser(token).then(() => setIsAuth(true));
      return component;
    }
  } else {
    return component;
  }
}