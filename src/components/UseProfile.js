'use client';
import { useEffect, useState } from "react";

export function useProfile() {
    const [data, setData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                setData(data);
                setLoading(false);
            })
        })
    }, []);

    return {loading,data};
} 


//Your custom hook, useProfile, is fetching user profile data from an API endpoint
// and managing the loading state.