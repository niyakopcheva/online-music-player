import { useEffect, useState, useRef } from "react"
import useGetArtists from "../hooks/useGetArtists";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([])
    const { artists, loadingArtists, errorArtists } = useGetArtists();
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    console.log(artists);
    
    function getAutocompleteResults(query) {
        /* const artistNames = [];
        artists.map((artist) => artistNames.push(artist.name)); */
        return new Promise((resolve, reject) => {
            resolve(
                artists.filter(artist =>
                artist.name.toLowerCase().includes(query.toLowerCase()))
            );
        });
    }
    
     useEffect(() => {
       (async () => {
        if(!query) {
            setResults([]);
            return;
        }
        const data = await getAutocompleteResults(query);
        setResults(data);
       })();
    }, [query, artists])
    
    if(loadingArtists) return <p>Loading...</p>
    if(errorArtists) return <p>Error: {errorArtists.message}</p>

    return (
        <div className="text-white flex-column justify-center mx-auto">
            <input placeholder="Search..." 
                ref={inputRef}
                className="py-1 px-2 text-black focus:outline-none" 
                value={query} onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}>
                </input>
            {isFocused && query && (
                <div className="flex flex-col  items-start">
                {results.map(result => <div className="bg-gray-800 w-full px-2 hover:bg-gray-600" 
                key={result.artist_id}
                onClick={(e) => inputRef.current.value = result.name}>
                    {result.name}</div>)}
                </div>
            )}
            
        </div>
    )
}