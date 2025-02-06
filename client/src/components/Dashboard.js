import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut(auth)
        .then(() => {
            navigate("/log-in");
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
    }

    return (
        <>
            <h1>Dashboard</h1>
            { currentUser ? (
                <div>
                    <p>Email: {currentUser.email}</p>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            ) : (
                <p>No user is logged in.</p>
            )}
        </>
    );
}