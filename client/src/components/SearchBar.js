import { useEffect, useState, useRef } from "react"
import useGetArtists from "../hooks/useGetArtists";
import useGetSongs from "../hooks/useGetSongs"
import useDebounceValue from "../hooks/useDebounceValue"
import Spinner from "./Spinner";

export default function SearchBar({ searchCategory, setArtistID }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([])
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const debounceQuery = useDebounceValue(query);
    const inputRef = useRef();


    useEffect(() => {
        (async () => {
            setResults([]);
            if (debounceQuery.length > 0) {

                const fetchResults = async () => {
                    setLoading(true);

                    try {
                        const response = await fetch(`http://localhost:5000/search?category=${searchCategory}&query=${debounceQuery}`);
                        if (!response.ok) throw new Error("Failed to fetch");

                        const data = await response.json();
                        setResults(data);
                    } catch (error) {
                        setError(error.message);
                    } finally {
                        setLoading(false);
                    }
                }

                console.log(debounceQuery); //test debouncing
                //const data = await getAutocompleteResults(debounceQuery);
                fetchResults();
                console.log(results);
            }
        })();
    }, [debounceQuery])

    const handleResultClick = (result) => {
        setQuery(result.name); // Update state to reflect the clicked result
        if (setArtistID) {
            setArtistID(result.id); // Pass selected artist ID to parent
        }
        setIsFocused(false);
    };

    if (error) return <p>Error: {error.message}</p>

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
                <div className="flex flex-col items-start" >
                    {results.map(result => <div className="bg-gray-300 text-black w-full px-2 hover:bg-green-500"
                        key={result.id}
                        onClick={() => {
                            handleResultClick(result);
                        }}
                    >
                        {result.name}</div>)}
                </div>
            )}

        </div>
    )
}