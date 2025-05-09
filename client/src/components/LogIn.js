import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { auth, facebookProvider, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";


export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert("User logged in successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error during log-in:", err.message);
            setError(err.message);
        }
    };

    const handleSignInWithProvider = async (provider) => {
        try {
            setLoading(true);
            await signInWithPopup(auth, provider);
            alert("User logged in successfully!");
            navigate("/");

        } catch (err) {
            console.error("Error during log-in:", err.message);
            setError(err.message);
        }
    };

    return (
        <main>
            <header className="logo-only">
                <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" /></svg>
            </header>

            <section className="form-section">
                <div className="form flex flex-col gap-12">
                    <header>
                        <h1 className="font-bold">Log in to Spotify</h1>
                    </header>
                    {error && (
                        <div className="px-3 py-3 bg-red-600 text-center rounded">
                            <p>Incorrect username or password</p>
                        </div>)
                    }

                    <button type="button" onClick={() => handleSignInWithProvider(googleProvider)} disabled={loading}
                        className="flex justify-center gap-x-3 items-center border-2 border-white rounded-full px-0 py-2.5 font-bold">
                        <img src=".\logos\7123025_logo_google_g_icon.svg" className="w-10"></img>
                        Log in with Google
                    </button>

                    <div className="flex justify-center items-center gap-x-3">
                        <div className="w-2/6 h-px bg-slate-400" /> or <div className="w-2/6 h-px bg-slate-400" />
                    </div>

                    <form onSubmit={handleLogIn}>
                        <div className="flex flex-col gap-6">
                            <div>
                                <label className="font-semibold" htmlFor="femail">Email address</label>
                                <input
                                    className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b border-white placeholder-gray-400"
                                    type="email"
                                    id="femail"
                                    placeholder="example@email.com"
                                    onBlur={(e) => setEmail(e.target.value)}
                                /></div>

                            <div>
                                <label className="font-semibold" htmlFor="fpass">Password</label>
                                <input
                                    className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b border-white placeholder-gray-400"
                                    type="password"
                                    id="fpass"
                                    onBlur={(e) => setPassword(e.target.value)}
                                />
                            </div>

                        </div>

                        <button type="submit" className="primary-btn" disabled={loading}>Log In</button>
                        <div className="additional-text">Don't have an account? <a className="underline" href="/sign-up">Sign up</a></div>
                    </form>

                </div>

            </section>
        </main>
    );
}