import React, { useEffect, useState } from "react";

export default function SearchForm() {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!searchQuery) return;

        fetchResults(searchQuery);
    }, [searchQuery]);

    const fetchResults = async (query: string): Promise<void> => {
        const response = await fetch(
            `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${query}`
        );
        if (!response.ok) throw new Error();

        const data = await response.json();
        console.log(data);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form className="search" onSubmit={(e) => e.preventDefault()}>
            <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <input
                value={searchQuery}
                spellCheck="false"
                type="text"
                required
                placeholder="Find remote developer jobs..."
                onChange={handleSearch}
            />
        </form>
    );
}
