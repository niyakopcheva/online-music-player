import { useEffect, useState } from "react";

const useGetArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                await fetch("http://localhost:5000/artists")
                .then(res => res.json())
                .then(data => setArtists(data))
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    return { artists, loading, error };

}

export default useGetArtists;