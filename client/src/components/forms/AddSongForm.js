import { useState } from "react";
import SearchBar from "../SearchBar";

export default function AddSongForm() {
    const [songName, setSongName] = useState("");
    const [artistID, setArtistID] = useState("");
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState("");
    const [audioPath, setAudioPath] = useState("");
    const [songPicPath, setSongPicPath] = useState("");
    const [isFilled, setIsFilled] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!songName || !artistID || !album || !duration || !audioPath || !songPicPath) {
            setIsFilled(false);
            return;
        }

        const newSong = {
            name: songName,
            artist_id: parseInt(artistID),
            album: album,
            duration: parseInt(duration),
            audio_file_path: audioPath,
            pic_path: songPicPath
        };

        try {
            const response = await fetch("http://localhost:5000/songs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSong),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to add song");
            }

            console.log(data); // Logs success message or error
            console.log("Successfully added song!");
            alert("Successfully added song!");
        } catch (err) {
            console.error("Error adding song:", err);
            alert(`Error adding song: ${err.message}`);
        }

    };


    return (
        <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Add Song</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Title</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Album</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={album}
                        onChange={(e) => setAlbum(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Artist</label>
                    <div className="w-full">
                        <SearchBar searchCategory={'artists'}
                            setArtistID={setArtistID}
                        />
                        {/* artistID && <p>Selected Artist ID: {artistID}</p> */}
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-white font-semibold">Duration(seconds)</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white font-semibold">Audio file URL</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={audioPath}
                        onChange={(e) => setAudioPath(e.target.value)}
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-white font-semibold">Picture file URL</label>
                    <input
                        type="text"
                        className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px]"
                        value={songPicPath}
                        onChange={(e) => setSongPicPath(e.target.value)}
                    />
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
                    Add song
                </button>
            </form>
        </div>
    )
}