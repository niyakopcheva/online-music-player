import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";

const PrivateRoute = ({ children, role }) => {
    const { currentUser} = useContext(AuthContext);
    const [hasAccess, setHasAccess] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state for role check

    useEffect( () => {
        const checkAccess = async () => {
            if(currentUser) {
            const idTokenResult = await currentUser.getIdTokenResult();
            console.log("Token claims:", idTokenResult.claims); // Debugging
            const userRole = idTokenResult.claims.role;
            setHasAccess(role ? userRole === role : true);
            }
            setLoading(false); // Role check complete
        }
        checkAccess()
    }, [currentUser, role]);

    if (!currentUser) {
        console.log('No user.');
        return <Navigate to="/log-in" />;
    }

    if (loading) {
        return <Spinner/>; // Optional loading spinner
    }

    if (role && !hasAccess) {
        console.log('User does not have access.');
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;

