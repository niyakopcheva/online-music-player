import { useState } from "react";
//import useGetSongs from "../hooks/useGetSongs";
//import useGetArtists from "../hooks/useGetArtists";
import SearchBar from "./SearchBar";

export default function AdminPage() {
    const [songTitle, setSongTitle] = useState("");
    const [artistID, setArtistID] = useState(null);
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState(null);
    const [audioPath, setAudioPath] = useState("");
    const [songPicPath, setSongPicPath] = useState("");

    const addSong = async () => {
        const newSong = {
            title: songTitle,
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
            alert()
          } catch(err) {
            console.error("Error adding song:", err);
          }
    }
    /////////////////////////////////////////////////////////////////
    const [artistName, setArtistName] = useState("");
    const [artistPicPath, setArtistPicPath] = useState("");

    const addArtist = async () => {
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
            console.log(data); // Logs success message or error
            console.log("Successfully added artist!");
        } catch(err) {
            console.error("Error adding artist: ", err);
        }
    }

    ////////////////// Testing custom hooks
    /* console.log("Songs:");
    const {songs, loading, error} = use();
    console.log(songs, loading, error); */

    /* console.log("Artists:");
    const {artists, loading, error} = useGetArtists();
    console.log(artists, loading, error); */

    return (
        <main>
            <header className="logo-only">
                            <svg className="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>
                        </header>
                        <SearchBar></SearchBar>
                        
                        
                        <section className="flex flex-col gap-8 py-10 px-40">
                        <header>
                                    <h1 className="font-bold w-full">Welcome to the Admin Page!</h1>
                        </header>
                        {/* // add song */}
                            <div >
                            <h2 className="font-bold w-full text-2xl py-6">Add song to database</h2>
            
                                <form onSubmit={addSong}>
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="title">Song Title</label> 
                                            <input 
                                                className="text-black font-normal"
                                                id="title" 
                                                onBlur={(e) => setSongTitle(e.target.value)}
                                            /> 
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="album">Album</label> 
                                            <input 
                                            className="text-black"
                                                id="album"
                                                onBlur={(e) => setAlbum(e.target.value)}
                                                /> 
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="album">Artist ID</label> 
                                            <input 
                                            className="text-black"
                                                id="album"
                                                onBlur={(e) => setArtistID(e.target.value)}
                                                /> 
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="album">Duration (seconds)</label> 
                                            <input 
                                            className="text-black"
                                                id="album"
                                                onBlur={(e) => setDuration(e.target.value)}
                                                /> 
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="album">Audio file URL</label> 
                                            <input 
                                            className="text-black"
                                                id="album"
                                                onBlur={(e) => setAudioPath(e.target.value)}
                                                /> 
                                        </div>

                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="album">Picture file URL</label> 
                                            <input 
                                            className="text-black"
                                                id="album"
                                                onBlur={(e) => setSongPicPath(e.target.value)}
                                                /> 
                                        </div>
                                        
                                        <button type="submit" className="bg-green-500 text-gray-900 p-5 hover:bg-green-700 font-semibold" >Submit song</button>

                                        
                                </div>
                                </form>
                                
                            </div>
                            
                        {/* // add artist */}
                            <div >
                            <h2 className="font-bold w-full text-2xl py-6">Add artist to database</h2>
            
                                <form onSubmit={addArtist}>
                                    <div className="flex gap-8">
                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="title">Name</label> 
                                            <input 
                                                className="text-black font-normal"
                                                id="title" 
                                                onBlur={(e) => setArtistName(e.target.value)}
                                            /> 
                                        </div>
                                        
                                        <div className="flex flex-col">
                                            <label className="font-semibold" htmlFor="title">Profile Picture URL</label> 
                                            <input 
                                                className="text-black font-normal"
                                                id="title" 
                                                onBlur={(e) => setArtistPicPath(e.target.value)}
                                            /> 
                                        </div>
                                        <button type="submit" className="bg-green-500 text-gray-900 p-5 hover:bg-green-700 font-semibold" >Submit artist</button>

                                        
                                </div>
                                </form>
                                
                            </div>
                            
                        </section>
        
    </main>
    )
    
    
}

