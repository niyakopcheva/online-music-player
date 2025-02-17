import { useEffect, useState, useRef} from "react"
import useGetArtists from "../hooks/useGetArtists";
import useGetSongs from "../hooks/useGetSongs"
import useDebounceValue from "../hooks/useDebounceValue"
import Spinner from "./Spinner";

export default function SearchBar({ searchCategory, setArtistID }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([])
    const inputRef = useRef();
    const [isFocused, setIsFocused] = useState(false);
    const debounceQuery = useDebounceValue(query);

    const { artists, loading: loadingArtists, error: errorArtists } = useGetArtists();
    const { songs, loading: loadingSongs, error: errorSongs } = useGetSongs();

    let data = [];
    let loading = false;
    let error = null;

    switch (searchCategory) {
        case 'artists':
            data = artists;
            loading = loadingArtists;
            error = errorArtists;
            break;
        case "songs":
            data = songs;
            loading = loadingSongs;
            error = errorSongs;
            break;
        default:
            data = [];
            loading = false;
            error = null;
    }

    const handleResultClick = (result) => {
        setQuery(result.name); // Update state to reflect the clicked result
        if (setArtistID) {
            setArtistID(result.id); // Pass selected artist ID to parent
        }
        setIsFocused(false)
      };
    
    function getAutocompleteResults(query) {
        return new Promise((resolve, reject) => {
            resolve(
                data.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase()))
            );
        });
    }
    
     useEffect(() => {
       (async () => {
        setResults([]);
        if(debounceQuery.length > 0) {
            console.log(debounceQuery); //test debouncing
            const data = await getAutocompleteResults(debounceQuery);
            setResults(data);
            console.log(results);
        }
       })();
    }, [debounceQuery])

    useEffect(() => {
        console.log("Items updated:", data);
    }, [data]); //only log data when data actually changes 
    
    
    if(loading) return <div className="flex items-center justify-center p-16"><Spinner/></div>
    if(error) return <p>Error: {error.message}</p>

    return (
        <div className="text-white flex-column justify-center mx-auto w-full">
            <input placeholder="Search..." 
                ref={inputRef}
                className="py-1 px-2 text-black focus:outline-none w-full" 
                value={query} onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                //onBlur={() => setIsFocused(false)}
                >
                </input>
            {isFocused && results.length > 0 && (
                <div className="flex flex-col  items-start" >
                {results.map(result => <div className="bg-gray-800 w-full px-2 hover:bg-gray-600" 
                key={result.id}
                onClick ={() => {
                    handleResultClick(result);
                }}
                >
                    {result.name}</div>)}
                </div>
            )}
            
        </div>
    )
}