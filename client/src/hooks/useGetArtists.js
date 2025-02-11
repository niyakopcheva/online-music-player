import { useEffect, useState } from "react";

const useGetArtists = () => {
    const [artists, setArtists] = useState([]);
    const [loadingArtists, setLoading] = useState(true);
    const [errorArtists, setError] = useState(null)

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

    return { artists, loadingArtists, errorArtists };

}

export default useGetArtists;