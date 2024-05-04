import React, { useEffect, useState } from "react";

const URL = "https://bytegrad.com/course-assets/projects/rmtdev/api/data";

export default function SearchForm() {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (!searchQuery) return;

        fetchResults(searchQuery);
    }, [searchQuery]);

    const fetchResults = (query: string): void => {
        console.log(query);
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
