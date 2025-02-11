import { useEffect, useState } from "react";

const useGetSongs = () => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                await fetch("http://localhost:5000/songs")
                .then(res => res.json())
                .then(data => setSongs(data))
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    return { songs, loading, error };

}

export default useGetSongs;