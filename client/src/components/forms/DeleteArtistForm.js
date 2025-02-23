import { useState } from "react";
import SearchBar from "../SearchBar";

export default function DeleteArtistForm() {
    const [artistID, setArtistID] = useState("");
    const [isFilled, setIsFilled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!artistID) {
            setIsFilled(false);
            return;
        }

        const artist = { id: parseInt(artistID) };

        try {
            const response = await fetch('http://localhost:5000/artists', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(artist),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error(data.error || "Bad Request: Missing required fields.");
                } else
                    if (response.status === 404) {
                        throw new Error(data.error || "Artist not found.");
                    } else
                        if (response.status === 500) {
                            throw new Error(data.error || "Internal Server Error.");
                        } else {
                            throw new Error("An unexpected error occurred.");
                        }
            }

            console.log(data); // Logs success message or error
            console.log("Successfully deleted artist!");
            alert("Successfully deleted artist!");
            setArtistID("");
        } catch (err) {
            console.log("Error deleting artist ", err);
            alert(`Error deleting artist: ${err.message}`)
        }
    }

    return (
        <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Delete Artist</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="flex flex-col">
                    <label className="text-white">Artist</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'artists'}
                            setArtistID={setArtistID}
                        />
                        {/* artistID && <p>Selected Artist ID: {artistID}</p> */}
                    </div>
                </div>

                {!isFilled && (
                    <div className="text-red-600 bg-red-300 text-center p-1 font-semibold rounded-sm">
                        Please select artist!
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 bg-green-500 text-gray-900 p-3 hover:bg-green-700 font-semibold"
                >
                    Delete artist
                </button>
            </form>
        </div>
    );
}