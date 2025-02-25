import { useState } from "react";
import SearchBar from "../SearchBar";

export default function UpdateSongForm() {
    const [songID, setSongID] = useState(null);
    const [songName, setSongName] = useState("");
    const [artistID, setArtistID] = useState("");
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState("");
    const [audioPath, setAudioPath] = useState("");
    const [songPicPath, setSongPicPath] = useState("");

    const [isFilled, setIsFilled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!songID) {
            alert("Please select song to update!")
        }

        if (!songName && !artistID && !album && !duration && !audioPath && !songPicPath) {
            setIsFilled(false);
            return;
        }

        const song = {
            id: parseInt(songID),
            name: songName || undefined,
            artist_id: parseInt(artistID) || undefined,
            album: album || undefined,
            duration: parseInt(duration) || undefined,
            audio_file_path: audioPath || undefined,
            pic_path: songPicPath || undefined
        }

        try {
            const response = await fetch("http://localhost:5000/songs", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(song)
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
            console.log("Successfully updated song!");
            alert("Successfully updated song!");
            setSongID("");
            setArtistID("");
        } catch (err) {
            console.log("Error updating song ", err);
            alert(`Error updating song: ${err.message}`);
        }
    }

    return (
        <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Update Song</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                <div className="flex flex-col">
                    <label className="text-white font-semibold flex gap-1"><div className="text-green-500">*</div> Select song</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'songs'}
                            setSongID={setSongID}
                        />
                        {/* songID && <p>Selected Song ID: {songID}</p> */}
                    </div>
                </div>


                <div className="flex flex-col">
                    <label className="text-white font-semibold">Title (optional)</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Album (optional)</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Artist (optional)</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'artists'}
                            setArtistID={setArtistID}
                        />
                        {/* artistID && <p>Selected Artist ID: {artistID}</p> */}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Duration(seconds) (optional)</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white font-semibold">Audio file URL (optional)</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={audioPath}
                        onChange={(e) => setAudioPath(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white font-semibold">Picture file URL (optional)</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={songPicPath}
                        onChange={(e) => setSongPicPath(e.target.value)}
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
                    Update song
                </button>
            </form>
        </div>
    );
}