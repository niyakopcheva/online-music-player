import { useState } from "react";
import SearchBar from "../SearchBar";

export default function UpdateArtistForm() {
    const [artistID, setArtistID] = useState("");
    const [artistName, setArtistName] = useState("");
    const [picPath, setPicPath] = useState("");
    const [isFilled, setIsFilled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!artistID) {
            alert("Please select artist to update!")
        }

        if (!artistName && !picPath) {
            setIsFilled(false);
            return;
        }

        const artist = {
            id: parseInt(artistID),
            name: artistName || undefined,
            profile_pic_path: picPath || undefined
        }

        try {
            const response = await fetch("http://localhost:5000/artists", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artist)
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(data.message || "Artist not found.")
                } else if (response.status === 500) {
                    throw new Error(data.error || "Internal Server Error.");
                } else {
                    throw new Error("An unexpected error occurred.");
                }
            }

            console.log(data); // Logs success message or error
            console.log("Successfully updated artist!");
            alert("Successfully updated artist!");
            setArtistID("");

        } catch (err) {
            console.log("Error updating artist ", err);
            alert(`Error updating artist: ${err.message}`);
        }
    }
    return (
        <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Update Artist</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                    <label className="text-white"><b className="text-green-500">REQUIRED:</b> Select artist</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'artists'}
                            setArtistID={setArtistID}
                        />
                        {/* artistID && <p>Selected Artist ID: {artistID}</p> */}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-white">New name (optional)</label>
                    <input
                        type="text"
                        className="text-black font-normal py-1 px-2 focus:outline-none w-full"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white">New picture path (optional)</label>
                    <input
                        type="text"
                        className="text-black font-normal py-1 px-2 focus:outline-none w-full"
                        value={picPath}
                        onChange={(e) => setPicPath(e.target.value)}
                    />
                </div>


                {!isFilled && (
                    <div className="text-red-600 bg-red-300 text-center p-1 font-semibold rounded-sm">
                        Please fill in at least one field!
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-gray-900 p-3 hover:bg-green-700 font-semibold"
                >
                    Update artist
                </button>
            </form>
        </div>
    );
}