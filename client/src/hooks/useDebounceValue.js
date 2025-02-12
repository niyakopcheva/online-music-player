import { useEffect, useState } from "react";

export default function useDebounceValue(value, time) {
    time = 500;
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value);
        }, time)

        return () => {
            clearTimeout(timeout);
        }
    }, [value, time]);

    return debounceValue;
}
