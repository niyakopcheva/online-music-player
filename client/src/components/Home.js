import { useEffect, useState } from 'react';
import getArtistName from '../queries/getArtistName';
import getProfilePic from '../queries/getProfilePic';


export default function Home() {
    const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/artists")
    .then(res => res.json())
    .then(data => setArtists(data))

    fetch("http://localhost:5000/songs")
    .then(res => res.json())
    .then(data => setSongs(data))
  }
    ,[]
  )
  return (
    <>
    

    <div className="App">
      <header className="App-header">
        <h1>Songs</h1>
        <ul>
        {songs.map((song) => (
          <li key={song.song_id}>
            <strong>{song.title}</strong> <br></br>
            <img className='rounded-full w-8 h-8' src={getProfilePic(artists, song.artist_id)}></img> {getArtistName(artists, song.artist_id)} <br></br>
            <audio controls autoPlay>
              <source src={song.file_path} type='audio/mpeg'></source>
              Your browser does not support the audio element.
            </audio>
          </li>
        ))

        }
      </ul>
      </header>
      
    </div>

    </>
  );
}