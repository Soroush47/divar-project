import { useEffect } from "react";

export const useFocus = (name, setFocus) =>
    useEffect(() => {
        setFocus(name);
    }, []);
