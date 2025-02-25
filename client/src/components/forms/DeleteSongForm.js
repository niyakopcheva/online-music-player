import { useState } from "react";
import SearchBar from "../SearchBar";

export default function DeleteSongForm() {
    const [songName, setSongName] = useState("");
    const [artistID, setArtistID] = useState("");
    const [isFilled, setIsFilled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!songName || !artistID) {
            setIsFilled(false);
            return;
        }

        const song = {
            name: songName,
            artist_id: artistID
        }

        try {
            const response = await fetch('http://localhost:5000/songs', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(data.error || "Bad Request: Missing required fields.");
                } else if (response.status === 404) {
                    throw new Error(data.message || "Song not found.");
                } else if (response.status === 500) {
                    throw new Error(data.error || "Internal Server Error.");
                } else {
                    throw new Error("An unexpected error occurred.");
                }
            }

            console.log(data); // Logs success message or error
            console.log("Successfully deleted song!");
            alert("Successfully deleted song!");
        } catch (err) {
            console.log("Error deleting song ", err);
            alert(`Error deleting song: ${err.message}`)
        }

    }

    return (
        <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Delete Song</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                    <label className="text-white font-semibold">Title</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'songs'}
                            setSongName={setSongName}
                        />
                    </div>
                </div>


                <div className="flex flex-col">
                    <label className="text-white font-semibold">Artist</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'artists'}
                            setArtistID={setArtistID}
                        />
                        {/*artistID && <p>Selected Artist ID: {artistID}</p> */}
                    </div>
                </div>

                {!isFilled && (
                    <div className="text-red-600 bg-red-300 text-center p-1 font-semibold rounded-sm">
                        Please fill in all fields!
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-gray-900 p-3 hover:bg-green-700 font-semibold"
                >
                    Delete song
                </button>
            </form>
        </div>
    );
}