import { useEffect, useState, useRef } from "react"
import useDebounceValue from "../hooks/useDebounceValue"

export default function SearchBar({ searchCategory, setArtistID, setSongID, setSongName }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([])
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const debounceQuery = useDebounceValue(query);
    const inputRef = useRef();
    const observer = useRef(null);

    const fetchResults = async (newQuery, newOffset) => {
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/search?category=${searchCategory}&query=${newQuery}&offset=${newOffset}`);
            if (!response.ok) throw new Error("Failed to fetch");

            const data = await response.json();

            // If new offset = 0, reset the list
            setResults(prev => newOffset === 0 ? data : [...prev, ...data]);

            // If we receive fewer than 10 results, there are no more to load
            setHasMore(data.length === 10);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        if (debounceQuery.length > 0) {
            setOffset(0) // reset pagination
            console.log(debounceQuery); //test debouncing
            //const data = await getAutocompleteResults(debounceQuery);
            fetchResults(debounceQuery, 0);
            console.log(results);
        } else {
            setResults([]);
        }
    }, [debounceQuery]);

    const handleResultClick = (result) => {
        setQuery(result.name); // Update state to reflect the clicked result
        if (setArtistID) {
            setArtistID(result.id); // Pass selected artist ID to parent
        }
        if (setSongID) {
            setSongID(result.id);
        }
        if (setSongName) {
            setSongName(result.name);
        }
        setIsFocused(false);
    };

    // Infinite Scroll Observer
    const lastResultRef = (node => {
        if (loading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                console.log("intersection");
                setOffset(prevOffset => {
                    const newOffset = prevOffset + 10;
                    fetchResults(debounceQuery, newOffset);
                    return newOffset;
                });
            }
        })

        if (node) observer.current.observe(node);
    })

    if (error) return <p>Error: {error.message}</p>

    return (
        <div className="relative text-white flex-column justify-center mx-auto w-full">
            <input placeholder="Search..."
                ref={inputRef}
                className="font-normal py-1 px-2 focus:outline-none w-full bg-transparent border-b-[1px] placeholder-gray-300"
                value={query} onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
            </input>
            {isFocused && results.length > 0 && (
                <div className="absolute top-full left-0 flex flex-col items-start p-static w-full h-[100px] overflow-auto z-50" >
                    {results.map((result, index) => <div className="cursor-pointer bg-gray-300 text-black w-full px-2 hover:bg-green-500"
                        key={result.id}
                        onMouseDown={() => {
                            handleResultClick(result);
                        }}
                        ref={index === results.length - 1 ? lastResultRef : null}
                    >
                        {result.name}</div>)}
                </div>
            )}

        </div>
    )
}