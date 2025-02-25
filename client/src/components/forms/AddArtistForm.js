import { useState } from "react";
import SearchBar from "../SearchBar";

export default function AddArtistForm() {
    const [artistName, setArtistName] = useState("");
    const [picPath, setPicPath] = useState("");
    const [isFilled, setIsFilled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!artistName) {
            setIsFilled(false);
            return;
        }

        const newArtist = {
            name: artistName,
            profile_pic_path: picPath
        };

        try {
            const response = await fetch("http://localhost:5000/artists", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArtist),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add artist");
            }
            if(isFilled === false) setIsFilled(true);
            console.log(data); // Logs success message or error
            console.log("Successfully added artist!");
            alert("Successfully added artist!");
            
        } catch (err) {
            console.error("Error adding artist:", err);
            alert(`Error adding artist: ${err.message}`);
        }

    };


    return (
        <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Add Artist</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Name</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Picture file URL</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none  bg-transparent border-b-[1px]"
                        value={picPath}
                        onChange={(e) => setPicPath(e.target.value)}
                    />
                </div>

                {!isFilled && (
                    <div className="text-red-600 bg-red-300 text-center p-1 font-semibold rounded-sm">
                        Please fill in name field!
                    </div>
                )}


                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-gray-900 p-3 hover:bg-green-700 font-semibold"
                >
                    Add Artist
                </button>
            </form>
        </div>
    )
}