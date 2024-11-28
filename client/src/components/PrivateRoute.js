import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LogIn from "./LogIn";

const PrivateRoute = ({ children }) => {
    const { currentUser} = useContext(AuthContext);
    return currentUser ? children : <Navigate to="/log-in" />
};

export default PrivateRoute;

