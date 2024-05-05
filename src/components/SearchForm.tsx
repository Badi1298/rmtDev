import React from 'react';

export default function SearchForm({ searchQuery, setSearchQuery }) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <form className="search" onSubmit={e => e.preventDefault()}>
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
