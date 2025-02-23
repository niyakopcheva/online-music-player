import { useState } from "react";
//import useGetSongs from "../hooks/useGetSongs";
//import useGetArtists from "../hooks/useGetArtists";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import AddSongForm from "./forms/AddSongForm";
import DeleteSongForm from "./forms/DeleteSongForm";
import UpdateSongForm from "./forms/UpdateSongForm";
import AddArtistForm from "./forms/AddArtistForm";
import DeleteArtistForm from "./forms/DeleteArtistForm";
import UpdateArtistForm from "./forms/UpdateArtistForm";


export default function AdminPage() {

    const [loading, setLoading] = useState(false);
    const [activeButton, setActiveButton] = useState(0);


    /////////////////////////////////////////////////////////////////
    const [artistName, setArtistName] = useState("");
    const [artistPicPath, setArtistPicPath] = useState("");

    const addArtist = async () => {
        setLoading(true);
        const newArtist = {
            name: artistName,
            profile_pic_path: artistPicPath
        };

        try {
            const response = await fetch("http://localhost:5000/add-artist", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArtist),
            });

            const data = await response.json();
            console.log(data);
            console.log("Successfully added artist!");
            setLoading(false);
            alert("Sucessfully added artist!");
        } catch (err) {
            console.error("Error adding artist: ", err);
        }

    }

    const handleSectionClick = (index) => {
        setActiveButton(index);
    }

    return (
        <main>
            <header className="logo-only">
                <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z" /></svg>
            </header>



            <section className="flex flex-col gap-8 py-10 px-40 items-center">
                <header>
                    <h1 className="font-bold w-full">Welcome to the Admin Page!</h1>
                </header>

                {/* Menu */}
                <ul className="flex gap-6">
                    <button
                        className={activeButton === 0 ?
                            "text-black cursor-pointer font-semibold bg-white p-2 text-xl rounded-full min-w-32 flex justify-center items-center hover:bg-opacity-80" :
                            "cursor-pointer font-semibold bg-white bg-opacity-20 p-2 text-xl rounded-full min-w-32 flex justify-center items-center hover:bg-opacity-15"}
                        onClick={() => handleSectionClick(0)}>
                        Songs</button>
                    <button
                        className={activeButton === 1 ?
                            "text-black cursor-pointer font-semibold bg-white p-2 text-xl rounded-full min-w-32 flex justify-center items-center hover:bg-opacity-80" :
                            "cursor-pointer font-semibold bg-white bg-opacity-20 p-2 text-xl rounded-full min-w-32 flex justify-center items-center hover:bg-opacity-15"}
                        onClick={() => handleSectionClick(1)}>
                        Artists</button>
                </ul>

                {activeButton === 0 &&
                    <>
                        <AddSongForm />
                        <DeleteSongForm />
                        <UpdateSongForm />
                    </>}




                {
                    activeButton === 1 &&
                    <>
                        <AddArtistForm />
                        <DeleteArtistForm />
                        <UpdateArtistForm />
                    </>
                }

            </section>

        </main>
    )


}

