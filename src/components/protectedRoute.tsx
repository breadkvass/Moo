import { JSX, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, useLocation } from "react-router-dom";

type TProtected = {
    component: JSX.Element;
}

export const ProtectedOnlyAuth = ({ component }: TProtected) => {
    const [ user, { setIsAuth }] = useContext(AuthContext);
    const location = useLocation();
    const token = localStorage.getItem('token');
  
    if (user.isAuth === true) {
      return component;
    } else if (user.isAuth === false && token) {
        if (token != null) {
          // get user
          setIsAuth(true);
          return component;
        } else {
        console.log('Ошибка токена')
        return <Navigate to="/login" state={{from: location} } />
        }
    } else {
      return <Navigate to="/login" state={{from: location} } />;
    }
  }