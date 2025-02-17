import { useState } from "react";
import SearchBar from "../SearchBar";

export default function AddSongForm() {
    const [songName, setSongName] = useState("");
    const [artistID, setArtistID] = useState(null);
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState(null);
    const [audioPath, setAudioPath] = useState("");
    const [songPicPath, setSongPicPath] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSong = {
            name: songName,
            artist_id: parseInt(artistID),
            album: album,
            duration: parseInt(duration),
            audio_file_path: audioPath,
            pic_path: songPicPath
          };

          try {
            const response = await fetch("http://localhost:5000/add-song",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(newSong),
          });

          const data = await response.json();
            console.log(data); // Logs success message or error
            console.log("Successfully added song!");
            alert("Successfully added song!");
          } catch(err) {
            console.error("Error adding song:", err);
          }
         
    };
    

     return (
            <div className="p-6 bg-gray-800 rounded-lg md:max-w-[800px] w-full min-w-60">
                <h2 className="text-xl font-bold text-white mb-4">Add Song</h2>
    
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    
                        <div className="flex flex-col">
                            <label className="text-white">Title</label>
                            <input
                                type= "text" 
                                className="text-black font-normal py-1 px-2 focus:outline-none w-full"
                                value={songName}
                                onChange={(e) => setSongName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-white">Album</label>
                            <input
                                type= "text" 
                                className="text-black font-normal py-1 px-2 focus:outline-none"
                                value={album}
                                onChange={(e) => setAlbum(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-white">Artist</label>
                            <div className="w-full">
                                <SearchBar searchCategory={'artists'}
                                setArtistID={setArtistID}
                                />
                                {artistID && <p>Selected Artist ID: {artistID}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-white">Duration(seconds)</label>
                            <input
                                type= "text" 
                                className="text-black font-normal py-1 px-2 focus:outline-none"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Audio file URL</label>
                            <input
                                type= "text" 
                                className="text-black font-normal py-1 px-2 focus:outline-none"
                                value={audioPath}
                                onChange={(e) => setAudioPath(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-white">Picture file URL</label>
                            <input
                                type= "text" 
                                className="text-black font-normal py-1 px-2 focus:outline-none"
                                value={songPicPath}
                                onChange={(e) => setSongPicPath(e.target.value)}
                            />
                        </div>
                    
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