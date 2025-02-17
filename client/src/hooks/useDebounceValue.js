import { useEffect, useState } from "react";

export default function useDebounceValue(value) {
    const time = 300;
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
